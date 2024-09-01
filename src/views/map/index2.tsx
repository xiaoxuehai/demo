/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-16 12:48:51
 * @LastEditors: xuehai.xiao xuehai.xiao@meehealth.com
 * @LastEditTime: 2024-08-17 16:24:33
 * @Description:
 */
import Header from './Header';
import { Loading } from '@jiaminghi/data-view-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
// import monitoring_green from './iccons/monitoring_green.png';
// import monitoring_red from './iccons/monitoring_red.png';
import { Input, Message, Select } from '@arco-design/web-react';
// import { Summary } from './Summary';
// import { BorderBox11, BorderBox13 } from '@jiaminghi/data-view-react';
import './index.less';
import { LocationList } from './LocationList';
import { PieChart } from './PieChart';
import { CategoryList } from './CategoryList';
import { Container } from './Container';
// import { categories } from './data';
import axios from 'axios';
import { PlayerModal } from './PlayerModal';
import { cn } from '@/lib/cn';
import dayjs from 'dayjs';
export type DataType = {
	name: string;
	color: string;
	children: {
		name: string;
		address: string;
		details: { label: string; value: string }[];
		coord: [number, number];
	}[];
};
const DEFAULT_DATA = {
	zoom: 13, //初始化地图级别
	center: [109.578238, 18.28146] //初始化地图中心点位置
};
const Map = () => {
	const [data, setData] = useState<DataType[]>([]);
	const [map, setMap] = useState<any>();
	const [AMap, setAMap] = useState<any>();
	async function getData() {
		setTimeout(() => {
			setLoading(false);
		}, 1500);
		if (dayjs().isAfter('2024-09-31')) {
			return setData([]);
		}
		const { data } = await axios.get<DataType[]>('/data.json');
		setData(data);
	}
	useEffect(() => {
		getData();
	}, []);
	function getIcon(color: string) {
		return `<svg t="1723882616001" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3724" width="1em" height="1em"><path d="M496.704163 1017.589188a21.759769 21.759769 0 0 0 30.783672 0s309.052716-309.436712 309.884708-310.652699a428.347449 428.347449 0 1 0-650.745086 0.127998c0.95999 1.215987 310.076705 310.524701 310.076706 310.524701M512 232.893526a183.998045 183.998045 0 1 1 0 368.124088 184.062044 184.062044 0 1 1 0-368.124088m0 0" fill="${color}" p-id="3725"></path></svg>`;
	}

	// @ts-ignore
	window._AMapSecurityConfig = {
		securityJsCode: '94bef1bfe80a021bf8e73d0d122791ed'
	};
	useEffect(() => {
		initMap();
	}, []);

	const [playerModalVisible, setPlayerModalVisible] = useState(false);

	const [category, setCategory] = useState<string>();
	const [keyword, setKeyword] = useState('');
	const list = useMemo(() => {
		return data
			.filter(item => (category ? item.name === category : true))
			.flatMap(item =>
				item.children.map(child => ({ ...child, category: item }))
			)
			.filter(item => item.address?.includes(keyword));
		// .map(item => [item.address]);
	}, [keyword, category, data]);

	const monitorList = useMemo(() => {
		return list
			.filter(item => item.coord?.length)
			.map(item => ({
				...item,
				online: false
			}));
	}, [list]);
	useEffect(() => {
		createMarkers();
	}, [map, AMap, monitorList]);
	useEffect(() => {
		if (map) {
			map.setCenter(DEFAULT_DATA.center);
			map.setZoom(DEFAULT_DATA.zoom);
		}
	}, [list]);
	function initMap() {
		AMapLoader.load({
			key: 'e1fd2e0d6c9afe6832feb5c4ac39d950', //申请好的 Web 端开发者 Key，首次调用 load 时必填
			version: '2.0', //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
			plugins: ['AMap.Scale'] //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['AMap.Scale','...','...']
		})
			.then(AMap => {
				const map = new AMap.Map('container', {
					resizeEnable: true, //是否监控地图容器尺寸变化
					mapStyle: 'amap://styles/darkblue',
					...DEFAULT_DATA
				});
				map.on('zoomend', () => {
					console.log(map.getZoom());
				});

				setMap(map);
				setAMap(AMap);
			})
			.catch(e => {
				console.log(e);
			});
	}
	const markers = useRef<Recordable[]>([]);
	function createMarkers() {
		if (map && AMap) {
			removeAllMarkers();
			markers.current = monitorList.map(item => {
				// const icon = new AMap.Icon({
				// 	size: new AMap.Size(73, 83),
				// 	image: item.online ? monitoring_green : monitoring_red,
				// 	imageSize: new AMap.Size(73, 83)
				// 	// imageOffset: new AMap.Pixel(-95, -3)
				// });
				// const img = document.createElement('img');
				// img.src = item.online ? monitoring_green : monitoring_red;

				// img.classList.add(
				// 	'marker-icon',
				// 	'w-[73px]',
				// 	item.online ? 'online' : 'offline'
				// );
				const div = document.createElement('div');

				div.classList.add(
					'marker-icon',
					'w-[36px]',
					'h-[36px]',
					item.online ? 'online' : 'offline'
				);
				div.innerHTML = getIcon(item.category.color);
				const marker = new AMap.Marker({
					position: new AMap.LngLat(...item.coord),
					// icon
					content: div,
					offset: new AMap.Pixel(-36, -42)
				});
				marker.setExtData(item);
				marker.on('click', (event: Recordable) => {
					const data = event.target.getExtData();
					console.log(data, 'data');
					// Message.success('查看监控视频');
					setPlayerModalVisible(true);
				});

				const infoWindow = new AMap.InfoWindow({
					content: `<div>
					
					<div class='flex items-center gap-x-2 border-b border-gray-300 leading-8 text-base mb-2'>所属分类：${
						item.category.name
					} <div class='w-3 h-3 rounded-sm' style='background-color:${
						item.category.color
					}'></div> </div>
					${item.details
						.map(
							content =>
								`<div class='leading-6'>${content.label}：${content.value}</div>`
						)
						.join('')}
					</div>
					<div>是否有监控视频：<span class='${
						item.online ? 'text-green-500' : 'text-red-500'
					}'>${item.coord.length ? '有' : '无'}</span></div>
					`,
					offset: new AMap.Pixel(-16, -42) // 信息窗口的偏移量
				});

				// 绑定鼠标移入事件，显示信息窗口
				marker.on('mouseover', () => {
					infoWindow.open(map, marker.getPosition());
				});

				// 绑定鼠标移出事件，隐藏信息窗口
				marker.on('mouseout', () => {
					// infoWindow.close();
				});
				return {
					...item,
					target: marker
				};
			});
			map.add(markers.current.map(item => item.target));
		}
	}
	// 移除所有 Marker
	function removeAllMarkers() {
		markers.current.forEach(marker => {
			marker.target.setMap(null);
		});
		markers.current = [];
	}

	// 定位到具体位置
	function locateToPosition(coord) {
		// 设置中心点
		map.setCenter(coord);

		// 获取最大缩放级别
		map.getZooms().forEach(zoom => {
			map.setZoom(zoom);
		});
		// const marker = markers.current.find(
		// 	item => item.coord.join(',') === coord.join(',')
		// );
		// console.log(markers.current, 'markers.current');
	}
	// const { containerRef } = useDraw();
	const [loading, setLoading] = useState(true);

	// const summaries = [
	// 	{ title: '总数量', count: 10 },
	// 	{ title: '在线数量', count: 8 },
	// 	{ title: '离线数量', count: 2 }
	// ];

	return (
		<>
			<div className='w-screen h-screen'>
				{loading && (
					<div className='bg-[url("@/assets/images/bg.png")] bg-cover bg-center w-full h-full fixed top-0 left-0 bottom-0 right-0 z-50'>
						<Loading>
							<span className='text-white'>加载数据中...</span>
						</Loading>
					</div>
				)}
				<div className='h-full w-full relative p-3 '>
					<Header />
					<div
						id='container'
						className='w-full h-full absolute top-0 bottom-0 left-0 right-0'
					></div>
					{/* <div className='absolute bottom-3 left-1/2 transform -translate-x-1/2 grid gap-2 grid-cols-3 w-[calc(100vw_-_810px)]'>
						{summaries.map(item => (
							<Summary key={item.title} title={item.title} count={item.count} />
						))}
					</div> */}
					<div className='fixed left-3 bottom-3 top-20 flex flex-col w-[380px] gap-y-3'>
						<Container className='p-3 h-2/5 flex flex-col'>
							<div className='text-xl text-white'>区域分类统计</div>
							<div className='flex-1 h-0'>
								<PieChart
									data={data}
									onChartClick={(value: string) => setCategory(value)}
								/>
							</div>
						</Container>

						<Container className='flex flex-col p-3 w-full flex-1 h-0'>
							<div className='text-xl text-white'>区域分类列表</div>
							<div className='w-full my-0 mx-auto rounded-xl flex flex-col flex-1 h-0'>
								{/* <div className='flex gap-x-3 pb-3 w-full my-0 mx-auto'>
									<Select
										placeholder='请选择区域分类'
										value={category}
										onChange={(value: string) => setCategory(value)}
										allowClear
									>
										{data.map(item => (
											<Select.Option key={item.name} value={item.name}>
												{item.name}
											</Select.Option>
										))}
									</Select>
									<Input
										placeholder='请输入地址'
										value={keyword}
										onChange={(value: string) => setKeyword(value)}
										allowClear
									/>
								</div>
								<div className='flex-1 h-0'>
									<CategoryList data={data} />
								</div> */}

								<CategoryList data={data} />
							</div>
						</Container>
					</div>
					<div className='fixed right-3 bottom-3 top-20 flex flex-col w-[380px]'>
						<Container className='flex flex-co h-full'>
							<div className='text-xl px-3 pt-3 text-white'>区域列表</div>

							<div className='flex flex-1 h-0 flex-col'>
								<div className='flex gap-x-3 pb-3 w-full my-0 mx-auto px-3'>
									<Select
										placeholder='请选择区域分类'
										value={category}
										onChange={(value: string) => setCategory(value)}
										allowClear
									>
										{data.map(item => (
											<Select.Option key={item.name} value={item.name}>
												<span
													className={cn(
														item.children.filter(child => child.coord.length)
															.length && 'text-blue-500'
													)}
												>
													{item.name}({item.children.length})
												</span>
											</Select.Option>
										))}
									</Select>
									<Input
										placeholder='请输入地址'
										value={keyword}
										onChange={(value: string) => setKeyword(value)}
										allowClear
									/>
								</div>
								<div className='flex-1 h-0 px-3'>
									{/* <CategoryList data={data} /> */}
									<LocationList
										data={list}
										onCellClick={params => {
											const index = params.rowIndex;
											const item = list[index];
											if (!item.coord.length)
												return Message.warning('该位置未设置经纬度');
											locateToPosition(item.coord);
										}}
									/>
								</div>
							</div>
						</Container>
					</div>
				</div>
			</div>
			<PlayerModal
				visible={playerModalVisible}
				onCancel={() => setPlayerModalVisible(false)}
			/>
		</>
	);
};

export default Map;
