/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-30 16:20:33
 * @LastEditors: 肖 学海 1379228273@qq.com
 * @LastEditTime: 2022-12-30 17:02:37
 * @Description:
 */
import axios from 'axios';
import { getAppEnvConfig } from './env';
const { VITE_APP_BASE_API } = getAppEnvConfig();
console.log(VITE_APP_BASE_API, 'VITE_APP_BASE_API');

const service = axios.create({
	baseURL: VITE_APP_BASE_API,
	timeout: 20 * 1000
});
service.interceptors.request.use(
	config => {
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);
service.interceptors.response.use(
	response => {
		const { businessStatus } = response.data;
		if (businessStatus === 1) {
			return response.data;
		} else {
			return Promise.reject(response.data);
		}
	},
	error => {
		return Promise.reject(error);
	}
);

export default service;
