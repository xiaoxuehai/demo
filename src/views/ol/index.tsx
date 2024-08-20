// 引入OpenLayers库
import { Map, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import * as Proj from 'ol/proj';
import { XYZ } from 'ol/source';
import { useEffect, useState } from 'react';

export default function Ol() {
	const [map, setMap] = useState(null); // 地图
	const [view, setView] = useState(null); // 地图视图

	useEffect(() => {
		// 监听地图视图并创建地图实例
		if (view) {
			// 创建一个高德图层
			const tileLayer = new TileLayer({
				source: new XYZ({
					url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&scl=1&size=1&style=7&x={x}&y={y}&z={z}'
				})
			});
			// 创建实例
			const _map = new Map({
				target: 'map',
				layers: [tileLayer], // 使用高德图层
				view: view
			});
			setMap(_map);
		}
	}, [view]);

	useEffect(() => {
		// 创建一个地图视图
		const viewObj = new View({
			center: Proj.transform(
				[104.06403453968424, 30.597419070782898],
				'EPSG:4326',
				'EPSG:3857'
			), // 使用'EPSG:3857'投影
			zoom: 16
		});
		setView(viewObj);
	}, []);

	return <div id='map' style={{ width: '100%', height: '100%' }}></div>;
}
