/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-19 16:32:27
 * @LastEditors: 肖 学海 1379228273@qq.com
 * @LastEditTime: 2022-12-27 13:57:10
 * @Description:
 */
import echarts from '@/lib/echarts';
import { EChartsOption } from 'echarts';
import { debounce } from 'lodash-es';
import { MutableRefObject, useEffect, useRef } from 'react';

export const useECharts = (
	chartRef: MutableRefObject<HTMLDivElement | null>
) => {
	const chartInstance = useRef<echarts.ECharts | null>(null);
	const cacheOptions = useRef<EChartsOption>({});
	function getOptions(): EChartsOption {
		return {
			backgroundColor: 'transparent',
			...cacheOptions.current
		};
	}
	const resize = debounce(function () {
		chartInstance.current?.resize();
	}, 200);
	function setOptions(options: EChartsOption) {
		cacheOptions.current = options;

		if (!chartInstance.current) {
			initCharts();
			if (!chartInstance.current) return;
		}

		chartInstance.current?.setOption(getOptions());
	}
	function initCharts() {
		if (!chartRef.current) {
			return;
		}
		chartInstance.current = echarts.init(chartRef.current);

		window.addEventListener('resize', resize);
	}
	useEffect(() => {
		return () => {
			if (!chartInstance.current) return;
			window.removeEventListener('resize', resize);
			chartInstance.current.dispose();
			chartInstance.current = null;
		};
	}, []);

	function getInstance(): echarts.ECharts | null {
		if (!chartInstance.current) {
			initCharts();
		}
		return chartInstance.current;
	}

	return {
		setOptions,
		resize,
		echarts,
		getInstance
	};
};
