/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-27 09:05:59
 * @LastEditors: 肖 学海 1379228273@qq.com
 * @LastEditTime: 2023-04-02 14:51:01
 * @Description:
 */
import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { GlobEnvConfig } from '@/types/config';
import { vitePluginForArco } from '@arco-plugins/vite-react';
import legacy from '@vitejs/plugin-legacy';
// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
	const env = loadEnv(mode, process.cwd()) as unknown as GlobEnvConfig;
	const base = env.VITE_BASE.endsWith('/')
		? env.VITE_BASE
		: `${env.VITE_BASE}/`;
	return defineConfig({
		base,
		plugins: [
			legacy({
				targets: ['Chrome 64'],
				modernPolyfills: true
			}),
			react(),
			vitePluginForArco({
				style: true
			})
		],
		resolve: {
			alias: [{ find: '@', replacement: '/src' }]
		},
		css: {
			preprocessorOptions: {
				less: {
					javascriptEnabled: true
				}
			}
		},
		server: {
			host: '0.0.0.0',
			port: 5300
		}
	});
};
