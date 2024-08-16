/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-27 10:55:23
 * @LastEditors: 肖 学海 1379228273@qq.com
 * @LastEditTime: 2022-12-30 17:57:34
 * @Description:
 */
import { useECharts } from '@/hooks/useECharts';
import { FC, useEffect, useRef } from 'react';
import echarts from '@/lib/echarts';
import { BusinessCount } from '../../types';
const LineChart: FC<{ data: BusinessCount }> = props => {
	const chartRef = useRef<Nullable<HTMLDivElement>>(null);
	const { setOptions } = useECharts(chartRef);
	const { xAxisData, yAxisData } = props.data;
	useEffect(() => {
		setOptions({
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					lineStyle: {
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [
								{
									offset: 0,
									color: 'rgba(0, 255, 233,0)'
								},
								{
									offset: 0.5,
									color: 'rgba(255, 255, 255,1)'
								},
								{
									offset: 1,
									color: 'rgba(0, 255, 233,0)'
								}
							],
							global: false
						}
					}
				}
			},
			grid: {
				top: '25%',
				left: 60,
				right: 40,
				bottom: '10%'
			},
			xAxis: {
				type: 'category',
				axisLine: {
					show: true
				},
				axisLabel: {
					color: '#BCDCF0'
				},
				splitLine: {
					show: false
				},
				boundaryGap: false,
				data: xAxisData
			},

			yAxis: {
				type: 'value',
				min: 0,
				splitLine: {
					show: true,
					lineStyle: {
						color: 'rgba(255,255,255,0.1)'
					}
				},
				axisLine: {
					show: true
				},
				axisLabel: {
					show: true,
					margin: 10,
					color: '#d1e6eb'
				},
				axisTick: {
					show: false
				}
			},
			series: [
				{
					name: '销售额(元)',
					type: 'line',
					smooth: true, //是否平滑
					// 阴影
					lineStyle: {
						color: '#1370FB',
						shadowColor: 'rgba(0, 0, 0, .3)',
						shadowBlur: 10,
						shadowOffsetY: 5,
						shadowOffsetX: 5,
						width: 3
					},
					label: {
						show: true,
						position: 'top',
						color: '#1370FB'
					},
					// 去除点标记
					symbolSize: 0,
					itemStyle: {
						color: '#1370FB'
					},
					// 设置渐变色
					areaStyle: {
						color: new echarts.graphic.LinearGradient(
							0,
							0,
							0,
							1,
							[
								{
									offset: 0,
									color: 'rgba(19,112,251,0.3)'
								},
								{
									offset: 1,
									color: 'rgba(0,202,149,0)'
								}
							],
							false
						),
						shadowColor: 'rgba(19,112,251, 0.9)',
						shadowBlur: 20
					},
					data: yAxisData
				}
			]
		});
	}, []);

	return <div ref={chartRef} className='h-full'></div>;
};

export default LineChart;
