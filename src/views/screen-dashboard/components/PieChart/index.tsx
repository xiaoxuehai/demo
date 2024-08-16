/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-27 10:55:23
 * @LastEditors: 肖 学海 1379228273@qq.com
 * @LastEditTime: 2023-01-10 09:17:14
 * @Description:
 */
import { useECharts } from '@/hooks/useECharts';
import { FC, useEffect, useRef } from 'react';
import { BusinessTypeRatioList } from '../../types';

const LineChart: FC<{ data: BusinessTypeRatioList }> = props => {
	const chartRef = useRef<Nullable<HTMLDivElement>>(null);
	const { setOptions } = useECharts(chartRef);

	useEffect(() => {
		setOptions({
			tooltip: {
				trigger: 'item'
			},
			// legend: {
			// 	top: 'bottom',
			// 	textStyle: {
			// 		color: 'rgb(255,255,255,0.9)'
			// 	}
			// },

			series: [
				{
					name: '交易分类排行占比',
					type: 'pie',
					roseType: 'area',
					radius: ['20%', '80%'],
					center: ['50%', '50%'],
					itemStyle: {
						borderRadius: 8
					},
					data: props.data,

					animationType: 'scale',
					animationEasing: 'exponentialInOut',
					animationDelay: function () {
						return Math.random() * 400;
					}
				}
			]
		});
	}, []);

	return <div ref={chartRef} className='h-full'></div>;
};

export default LineChart;
