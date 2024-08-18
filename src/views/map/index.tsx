/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-16 12:48:51
 * @LastEditors: xuehai.xiao xuehai.xiao@meehealth.com
 * @LastEditTime: 2024-08-17 16:14:39
 * @Description:
 */
// import useDraw from '@/hooks/useDraw';
// import styles from './index.module.less';
import Header from './Header';
import { Loading } from '@jiaminghi/data-view-react';
import { useEffect, useMemo, useState } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import monitoring_green from './iccons/monitoring_green.png';
import monitoring_red from './iccons/monitoring_red.png';
import { Input, Message, Select } from '@arco-design/web-react';
import { Summary } from './Summary';
// import { BorderBox11, BorderBox13 } from '@jiaminghi/data-view-react';
import './index.less';
import { List } from './List';
import { BarChart } from './BarChart';
import { Right } from './Right';
import { Container } from './Container';
import { categories } from './data';

const Map = () => {
	// const { containerRef } = useDraw();
	const [loading, setLoading] = useState(true);

	const monitorList = [
		{ online: true, coord: [109.560848, 18.282999], name: '未名湖' },
		{ online: false, coord: [109.590845, 18.285328], name: '新村' },
		{ online: true, coord: [109.58709, 18.279846], name: '吉阳小学' },
		{ online: true, coord: [109.570427, 18.28529], name: '龙坡村' },
		{ online: true, coord: [109.579755, 18.274544], name: '红土坎村' },
		{
			online: false,
			coord: [109.603952, 18.279568],
			name: '三亚吉阳区县仙逸园'
		},
		{ online: true, coord: [109.599075, 18.285177], name: '新红村' },
		{ online: true, coord: [109.580274, 18.284953], name: '吉阳区教育局' },
		{ online: false, coord: [109.583522, 18.287013], name: '山营村' },
		{ online: true, coord: [109.577494, 18.278396], name: '交通大厦' }
	];
	// @ts-ignore
	window._AMapSecurityConfig = {
		securityJsCode: '94bef1bfe80a021bf8e73d0d122791ed'
	};
	useEffect(() => {
		initMap();
	}, []);
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
					zoom: 15, //初始化地图级别
					center: [109.578238, 18.28146] //初始化地图中心点位置
				});
				map.on('zoomend', () => {
					console.log(map.getZoom());
				});
				const markers = monitorList.map(item => {
					// const icon = new AMap.Icon({
					// 	size: new AMap.Size(73, 83),
					// 	image: item.online ? monitoring_green : monitoring_red,
					// 	imageSize: new AMap.Size(73, 83)
					// 	// imageOffset: new AMap.Pixel(-95, -3)
					// });
					const img = document.createElement('img');
					img.src = item.online ? monitoring_green : monitoring_red;

					img.classList.add(
						'marker-icon',
						'w-[73px]',
						item.online ? 'online' : 'offline'
					);
					const marker = new AMap.Marker({
						position: new AMap.LngLat(...item.coord),
						// icon
						content: img,
						offset: new AMap.Pixel(-36, -42)
					});
					marker.setExtData(item);
					marker.on('click', (event: Recordable) => {
						const data = event.target.getExtData();
						console.log(data, 'data');
						Message.success('查看监控视频');
					});

					let infoWindow = new AMap.InfoWindow({
						content: `<div>${item.name}</div>`,
						offset: new AMap.Pixel(0, -30) // 信息窗口的偏移量
					});

					// 绑定鼠标移入事件，显示信息窗口
					marker.on('mouseover', () => {
						infoWindow.open(map, marker.getPosition());
					});

					// 绑定鼠标移出事件，隐藏信息窗口
					marker.on('mouseout', () => {
						infoWindow.close();
					});

					return marker;
				});
				map.add(markers);
				console.log(map);
				setTimeout(() => {
					setLoading(false);
				}, 1500);
			})
			.catch(e => {
				console.log(e);
			});
	}
	const summaries = [
		{ title: '总数量', count: 10 },
		{ title: '在线数量', count: 8 },
		{ title: '离线数量', count: 2 }
	];
	const [category, setCategory] = useState<string>();
	const [keyword, setKeyword] = useState('');
	const list = useMemo(() => {
		return categories
			.filter(item => item.title.includes(category || ''))
			.flatMap(item => item.children)
			.filter(item => item.includes(keyword))
			.map(item => [item]);
	}, [keyword, category]);
	return (
		<div className='w-screen h-screen'>
			{loading && (
				<div className='bg-[url("@/assets/images/bg.png")] bg-cover bg-center w-full h-full fixed top-0 left-0 bottom-0 right-0 z-50'>
					<Loading>
						<span className='text-white'>加载数据中...</span>
					</Loading>
				</div>
			)}
			<div className='h-full w-full relative p-3'>
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
					<Container className='p-3 h-[240px] flex flex-col'>
						<div className='text-xl text-white'>区域分类统计</div>
						<div className='flex-1 h-0'>
							<BarChart />
						</div>
					</Container>

					<Container className='flex flex-col p-3 w-full flex-1 h-0'>
						<div className='text-xl text-white'>区域统计</div>
						<div className='w-full my-0 mx-auto rounded-xl flex flex-col flex-1 h-0'>
							<div className='flex gap-x-3 pb-3 w-full my-0 mx-auto'>
								<Select
									placeholder='请选择区域分类'
									value={category}
									onChange={(value: string) => setCategory(value)}
									allowClear
								>
									{categories.map(item => (
										<Select.Option key={item.title} value={item.title}>
											{item.title}
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
								<List data={list} />
							</div>
						</div>
					</Container>
				</div>
				<div className='fixed right-3 bottom-3 top-20 flex flex-col w-[380px]'>
					<Container className='flex flex-co h-full'>
						<div className='text-xl px-3 pt-3 text-white'>区域分类统计</div>
						<div className='flex-1 h-0 px-3'>
							<Right data={categories} />
						</div>
					</Container>
				</div>
			</div>
		</div>
	);
};

export default Map;
