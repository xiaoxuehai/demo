/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-27 09:27:12
 * @LastEditors: 肖 学海 1379228273@qq.com
 * @LastEditTime: 2022-12-27 09:37:03
 * @Description:
 */
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import ScreenDashboard from '@/views/screen-dashboard';
export const routes: RouteObject[] = [
	{
		path: '/',
		element: <Navigate to='/screen-dashboard' />
	},
	{
		path: '/screen-dashboard',
		element: <ScreenDashboard />
	}
];
const Router = () => useRoutes(routes);

export default Router;
