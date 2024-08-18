/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-27 10:55:23
 * @LastEditors: 肖 学海 1379228273@qq.com
 * @LastEditTime: 2023-01-10 09:17:14
 * @Description:
 */
import { useECharts } from '@/hooks/useECharts';
import { graphic } from 'echarts';
import { useEffect, useRef } from 'react';
import { categories } from './data';

export const BarChart = () => {
	const chartRef = useRef<Nullable<HTMLDivElement>>(null);
	const { setOptions } = useECharts(chartRef);

	useEffect(() => {
		setOptions({
			color: ['#73A0FA', '#73DEB3', '#32C5E9', '#67E0E3'],
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					crossStyle: {
						color: '#999'
					},
					lineStyle: {
						type: 'dashed'
					}
				}
			},
			grid: {
				left: '15',
				right: '15',
				bottom: '0',
				top: '30',
				containLabel: true
			},
			legend: {
				data: ['门店1', '门店2', '门店3', '门店4'],
				show: true,
				textStyle: {
					color: '#BCDCFF'
				}
			},
			xAxis: [
				{
					type: 'category',
					data: categories.map(item => item.title),
					axisLabel: {
						color: '#BCDCF0',

						fontSize: 12
					},

					splitLine: {
						show: false
					},
					axisTick: {
						show: true
					},
					axisLine: {
						show: false
					},
					boundaryGap: true
				},
				{
					type: 'category',
					axisLabel: {
						color: '#BCDCF0',
						fontSize: 12
					},
					splitLine: {
						show: false
					},
					axisTick: {
						show: true
					},
					axisLine: {
						show: false
					},
					boundaryGap: true
				}
			],
			yAxis: [
				{
					type: 'value',
					name: '数量',
					nameTextStyle: {
						color: '#BCDCFF'
					},
					axisLabel: {
						color: '#BCDCF0',
						fontSize: 12
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: '#252938'
						}
					},
					axisTick: {
						show: true
					},
					axisLine: {
						show: true
					}
				}
			],
			series: [
				{
					name: '数量',
					type: 'bar',
					data: categories.map(item => item.count),
					itemStyle: {
						color: new graphic.LinearGradient(0, 0, 0, 1, [
							{
								offset: 0,
								color: 'rgba(34,224,214,.9)'
							},
							{
								offset: 0.5,
								color: 'rgba(5,137,186,0.5)'
							},
							{
								offset: 1,
								color: 'rgba(11,12,31,1)'
							}
						]),
						borderRadius: 7.5
					},
					barMaxWidth: 15
				}
			]
		});
	}, []);

	return <div ref={chartRef} className='h-full w-full'></div>;
};
