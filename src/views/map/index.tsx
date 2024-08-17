/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-16 12:48:51
 * @LastEditors: xuehai.xiao xuehai.xiao@meehealth.com
 * @LastEditTime: 2024-08-17 13:05:17
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
import { Message } from '@arco-design/web-react';
import { Summary } from './Summary';
const Map = () => {
	const monitorList = [
		{ online: true, coord: [114.373252, 30.505342] },
		{ online: false, coord: [114.362287, 30.503436] },
		{ online: true, coord: [114.380291, 30.503436] },
		{ online: true, coord: [114.375937, 30.508984] },
		{ online: true, coord: [114.373088, 30.49978] },
		{ online: false, coord: [114.359106, 30.499715] },
		{ online: true, coord: [114.364259, 30.502669] },
		{ online: true, coord: [114.365093, 30.509133] },
		{ online: false, coord: [114.381746, 30.510113] },
		{ online: true, coord: [114.388604, 30.506424] }
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
				center: [114.373252, 30.505342] //初始化地图中心点位置
			});

			const markers = monitorList.map(item => {
				const icon = new AMap.Icon({
					size: new AMap.Size(73, 83),
					image: item.online ? monitoring_green : monitoring_red,
					imageSize: new AMap.Size(73, 83)
					// imageOffset: new AMap.Pixel(-95, -3)
				});
				const marker = new AMap.Marker({
					position: new AMap.LngLat(...item.coord),
					icon: icon
					// offset: new AMap.Pixel(-13, -30)
				});
				marker.setExtData(item);
				marker.on('click', (event: Recordable) => {
					const data = event.target.getExtData();
					console.log(data, 'data');
					Message.success('查看监控视频');
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
	return (
		<div className='w-screen h-screen bg-[url("@/assets/images/bg.png")] bg-cover bg-center'>
			{loading ? (
				<Loading>
					<span className='text-white'>加载数据中...</span>
				</Loading>
			) : (
				<div className='h-full w-full relative p-3'>
					<Header />
					<div
						id='container'
						className='w-full h-full absolute top-0 bottom-0 left-0 right-0'
					></div>

					<div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-x-3'>
						<Summary title='总数量' count={monitorList.length} />
						<Summary
							title='在线数量'
							count={monitorList.filter(item => item.online).length}
						/>
						<Summary
							title='离线数量'
							count={monitorList.filter(item => !item.online).length}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default Map;
