/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-27 09:27:12
 * @LastEditors: xuehai.xiao xuehai.xiao@meehealth.com
 * @LastEditTime: 2024-08-17 15:38:42
 * @Description:
 */
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
// import Map from '@/views/map';
import Map2 from '@/views/map/index2';
// import ScreenDashboard from '@/views/screen-dashboard';
// import Leaflet from '@/views/leaflet';
// import Antv from '@/views/antv';
// import Ol from '@/views/ol';
import Test from '@/views/test';
import About from '@/views/landing/about';
import Landing from '@/views/landing';
import SquadSituation from '@/views/landing/squad-situation';
import Case from '@/views/landing/case';
export const routes: RouteObject[] = [
	{
		path: '/',
		element: <Navigate to='/board' />
	},
	{
		path: '/board',
		element: <Map2 />
	},
	// {
	// 	path: '/map',
	// 	element: <Map />
	// },
	// {
	// 	path: '/map2',
	// 	element: <Map2 />
	// },
	// {
	// 	path: '/leaflet',
	// 	element: <Leaflet />
	// },
	// {
	// 	path: '/antv',
	// 	element: <Antv />
	// },
	// {
	// 	path: '/ol',
	// 	element: <Ol />
	// },
	{
		path: '/test',
		element: <Test />
	},
	// {
	// 	path: '/screen-dashboard',
	// 	element: <ScreenDashboard />
	// }
	{
		path: '/landing',
		element: <Landing />,
		children: [
			{
				path: 'about',
				element: <About />
			},
			{
				path: 'squad-situation',
				element: <SquadSituation />
			},
			{
				path: 'case',
				element: <Case />
			}
		]
	}
];
const Router = () => useRoutes(routes);

export default Router;
