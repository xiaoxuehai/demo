/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-30 16:21:49
 * @LastEditors: 肖 学海 1379228273@qq.com
 * @LastEditTime: 2023-01-05 14:50:07
 * @Description:
 */
import request from '@/utils/request';
import { ScreenState, StoreItem } from './index.model';

/**
 * @description:
 * @param {object} data
 * @return {*}
 */
export function getBigScreen(data: { id: number }) {
	return request<ScreenState>({
		url: '/api/StallGoodsPrice/BigScreen/GetBigScreen',
		method: 'POST',
		data
	});
}
export function getStore() {
	return request<StoreItem[]>({
		url: '/api/Common/DropDownData/GetStore',
		method: 'POST'
	});
}
