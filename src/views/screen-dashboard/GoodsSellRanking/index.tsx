/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-27 10:33:49
 * @LastEditors: 肖 学海 1379228273@qq.com
 * @LastEditTime: 2023-01-05 14:24:34
 * @Description:
 */

import { ScrollBoard } from '@jiaminghi/data-view-react';
import { FC } from 'react';
import { GoodsSellRankingList } from '../types';

const GoodsSellRanking: FC<{ data: GoodsSellRankingList }> = props => {
	const config = {
		// 表头背景色
		headerBGC: '#1370FB',
		// 奇数行背景色
		oddRowBGC: '#383C84',
		// 偶数行背景色
		evenRowBGC: '#070C34',
		// 行号
		index: true,
		// 宽度
		columnWidth: [50],
		// 对其方式
		align: ['center'],
		// 表行数
		rowNum: 5,
		hoverPause: props.data.length > 5,
		carousel: 'single'
	};
	const header = ['商品名称', '商品数量', '商品金额'];

	const data = props.data.map(item => [
		item.goodsName,
		item.quantity,
		item.amount
	]);
	return (
		<div className='p-4 w-full h-full '>
			<ScrollBoard
				classNmae='w-full h-full'
				config={{ ...config, header, data }}
			></ScrollBoard>
		</div>
	);
};

export default GoodsSellRanking;
