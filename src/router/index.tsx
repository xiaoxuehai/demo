/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-27 09:27:12
 * @LastEditors: xuehai.xiao xuehai.xiao@meehealth.com
 * @LastEditTime: 2024-08-17 10:11:00
 * @Description:
 */
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import Map from '@/views/map';
import Leaflet from '@/views/leaflet';
export const routes: RouteObject[] = [
	{
		path: '/leaflet',
		element: <Leaflet />
	},
	{
		path: '/',
		element: <Navigate to='/map' />
	},
	{
		path: '/map',
		element: <Map />
	}
	// {
	// 	path: '/',
	// 	element: <Navigate to='/screen-dashboard' />
	// },
	// {
	// 	path: '/screen-dashboard',
	// 	element: <ScreenDashboard />
	// }
];
const Router = () => useRoutes(routes);

export default Router;
