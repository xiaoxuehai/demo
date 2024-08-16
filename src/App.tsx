/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-27 09:05:59
 * @LastEditors: 肖 学海 1379228273@qq.com
 * @LastEditTime: 2023-01-05 14:15:03
 * @Description:
 */
import { HashRouter } from 'react-router-dom';
import Router from './router';
import { ConfigProvider } from '@arco-design/web-react';
function App() {
	return (
		<ConfigProvider>
			<HashRouter>
				<Router />
			</HashRouter>
		</ConfigProvider>
	);
}

export default App;
