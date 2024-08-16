/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-19 16:36:43
 * @LastEditors: 肖 学海 1379228273@qq.com
 * @LastEditTime: 2022-12-27 10:48:59
 * @Description:
 */
import * as echarts from 'echarts/core';

import {
	BarChart,
	LineChart,
	PieChart,
	MapChart,
	PictorialBarChart,
	RadarChart,
	ScatterChart
} from 'echarts/charts';

import {
	TitleComponent,
	TooltipComponent,
	GridComponent,
	PolarComponent,
	AriaComponent,
	ParallelComponent,
	LegendComponent,
	RadarComponent,
	ToolboxComponent,
	DataZoomComponent,
	VisualMapComponent,
	TimelineComponent,
	CalendarComponent,
	GraphicComponent
} from 'echarts/components';

import { SVGRenderer } from 'echarts/renderers';

echarts.use([
	LegendComponent,
	TitleComponent,
	TooltipComponent,
	GridComponent,
	PolarComponent,
	AriaComponent,
	ParallelComponent,
	BarChart,
	LineChart,
	PieChart,
	MapChart,
	RadarChart,
	SVGRenderer,
	PictorialBarChart,
	RadarComponent,
	ToolboxComponent,
	DataZoomComponent,
	VisualMapComponent,
	TimelineComponent,
	CalendarComponent,
	GraphicComponent,
	ScatterChart
]);

export default echarts;
