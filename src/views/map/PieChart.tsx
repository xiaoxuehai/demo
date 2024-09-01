/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-27 10:55:23
 * @LastEditors: 肖 学海 1379228273@qq.com
 * @LastEditTime: 2023-01-10 09:17:14
 * @Description:
 */
import { useECharts } from '@/hooks/useECharts';
// import { graphic } from 'echarts';
import { useEffect, useRef } from 'react';
import { DataType } from './index2';

// import { categories } from './data';
export type PieChartProps = {
	data: DataType[];
	onChartClick?: (name: string) => void;
};

export const PieChart = ({ data, onChartClick }: PieChartProps) => {
	const chartRef = useRef<Nullable<HTMLDivElement>>(null);
	const { setOptions, getInstance } = useECharts(chartRef);

	useEffect(() => {
		setOptions({
			// color: ['#73A0FA', '#73DEB3', '#32C5E9', '#67E0E3'],
			legend: {
				orient: 'vertical',
				left: 'left',
				top: 'center',
				textStyle: {
					color: '#fff',
					fontSize: 10
				}
				// itemWidth: 20, // 图例项的宽度
				// itemHeight: 10 // 图例项的高度
			},

			tooltip: {
				trigger: 'item'
			},
			series: [
				{
					name: '区域分类数量统计',
					type: 'pie',
					radius: [50, 90],
					center: [240, '50%'], // 饼图的位置
					avoidLabelOverlap: false,
					itemStyle: {
						borderRadius: 10,
						borderWidth: 0
					},
					label: {
						show: false,
						position: 'center'
					},
					emphasis: {
						label: {
							show: true,
							fontSize: 12
						},
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					},
					labelLine: {
						show: false
					},
					data: data.map(item => ({
						name: item.name,
						value: item.children.length,
						itemStyle: {
							color: item.color
							// color: generateLightBlueShades()[index]
						}
					}))
				}
			]
		});
	}, [data, onChartClick]);

	useEffect(() => {
		const chart = getInstance();
		chart.off('click');
		chart.on('click', params => {
			onChartClick(params.name);
		});
	}, [onChartClick]);

	return <div ref={chartRef} className='h-full w-full'></div>;
};
