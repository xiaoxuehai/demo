/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-24 11:13:05
 * @LastEditTime: 2023-01-05 14:31:17
 * @LastEditors: 肖 学海 1379228273@qq.com
 */

import { GlobEnvConfig } from '@/types/config';

export function getAppEnvConfig() {
	const ENV = (
		import.meta.env.DEV
			? (import.meta.env as unknown as GlobEnvConfig)
			: window.__APP_CONFIG__
	) as GlobEnvConfig;

	const { VITE_APP_TITLE, VITE_APP_BASE_API, VITE_BASE } = ENV;
	return {
		VITE_BASE,
		VITE_APP_BASE_API,
		VITE_APP_TITLE
	};
}
