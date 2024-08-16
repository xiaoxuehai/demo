/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-11-01 14:35:58
 * @LastEditors: 肖 学海 1379228273@qq.com
 * @LastEditTime: 2023-01-03 17:43:52
 * @Description:
 */
// import { GlobEnvConfig } from './config';

declare type Recordable<T = any> = Record<string, T>;
declare type Nullable<T> = T | null;
declare type TimeoutHandle = ReturnType<typeof setTimeout>;
declare type IntervalHandle = ReturnType<typeof setInterval>;
declare interface Fn<T = any, R = T> {
	(...arg: T[]): R;
}
declare module '@jiaminghi/data-view-react';

declare interface Window {
	__APP_CONFIG__: GlobEnvConfig;
}
