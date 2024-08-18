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
import { useEffect, useState } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import monitoring_green from './iccons/monitoring_green.png';
import monitoring_red from './iccons/monitoring_red.png';
import { Input, Message, Select } from '@arco-design/web-react';
import { Summary } from './Summary';
import { BorderBox11 } from '@jiaminghi/data-view-react';
import './index.less';
import { List } from './List';

const Map = () => {
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
		})
		.catch(e => {
			console.log(e);
		});

	// const { containerRef } = useDraw();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1500);
	}, []);

	const categories = [
		{ title: '危房数量', count: 1 },
		{ title: '主干道低洼易涝点数量', count: 2 },
		{ title: '各村社区低洼易安置点数量', count: 3 },
		{ title: '地质灾害隐患点数量', count: 1 },
		{ title: '水库山塘（河道）数量', count: 1 },
		{ title: '景区景点数量', count: 1 },
		{ title: '易受淹小区数量', count: 1 },
		{ title: '漫水路桥数量', count: 1 },
		{ title: '物资仓库点位数量', count: 1 }
	];
	return (
		<div className='w-screen h-screen bg-[url("@/assets/images/bg.png")] bg-cover bg-center'>
			{loading ? (
				<Loading>
					<span className='text-white'>加载数据中...</span>
				</Loading>
			) : (
				<div className='h-full w-full relative p-3 '>
					<Header />
					<div
						id='container'
						className='w-full h-full absolute top-0 bottom-0 left-0 right-0'
					></div>

					<div className='absolute w-[680px] bottom-8 left-1/2 transform -translate-x-1/2 grid grid-cols-3 gap-3'>
						{categories.map(item => (
							<Summary key={item.title} title={item.title} count={item.count} />
						))}
					</div>
					<div className='w-[390px] h-[calc(100vh_-_100px)]'>
						<BorderBox11 title='区域统计' className='pt-12 '>
							<div className='bg-[rgba(19,25,47,0.9)] w-[370px] my-0 mx-auto p-3  rounded-xl'>
								<div className='flex gap-x-3 pb-3 w-[350px] my-0 mx-auto'>
									<Select placeholder='请选择区域分类'>
										{categories.map(item => (
											<Select.Option key={item.title} value={item.title}>
												{item.title}
											</Select.Option>
										))}
									</Select>
									<Input placeholder='请输入地址' />
								</div>
								<div className='w-full flex justify-center'>
									<List />
								</div>
							</div>
						</BorderBox11>
					</div>
				</div>
			)}
		</div>
	);
};

export default Map;
