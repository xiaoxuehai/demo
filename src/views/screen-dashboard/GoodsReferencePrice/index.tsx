/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-27 10:33:49
 * @LastEditors: 肖 学海 1379228273@qq.com
 * @LastEditTime: 2023-01-05 14:24:26
 * @Description:
 */

import { ScrollBoard } from '@jiaminghi/data-view-react';
import { FC } from 'react';
import { GoodsReferencePriceList } from '../types';

const GoodsReferencePrice: FC<{ data: GoodsReferencePriceList }> = props => {
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
		columnWidth: [50, 250, 100],
		// 对其方式
		align: ['center'],
		// 表行数
		rowNum: 10,
		hoverPause: props.data.length > 10,
		carousel: 'single'
	};
	const header = ['商品名称', '指导价'];

	const data = props.data.map(item => [item.goodsName, item.referencePrice]);
	return (
		<div className='p-4 w-full h-full '>
			<ScrollBoard
				classNmae='w-full h-full'
				config={{ ...config, header, data }}
			></ScrollBoard>
		</div>
	);
};

export default GoodsReferencePrice;
