/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-27 09:53:45
 * @LastEditors: 肖 学海 1379228273@qq.com
 * @LastEditTime: 2022-12-30 17:09:18
 * @Description:
 */
import { FC } from 'react';
import { BusinessData } from '../types';
import Card from './Card';
import styles from './index.module.less';
const CardList: FC<{ data: BusinessData }> = props => {
	const {
		incomeAmount,
		orderCount,
		guestPrice,
		addMemberCount,
		memberConsume,
		memberStored
	} = props.data;
	const dataList = [
		{
			name: '今日营业额(元)',
			value: incomeAmount ?? 0
		},
		{
			name: '今日客单量',
			value: orderCount ?? 0
		},
		{
			name: '今日客单价(元)',
			value: guestPrice ?? 0
		},
		{
			name: '今日新增会员数',
			value: addMemberCount ?? 0
		},
		{
			name: '今日会员消费(元)',
			value: memberConsume ?? 0
		},
		{
			name: '今日会员储值(元)',
			value: memberStored ?? 0
		}
	];

	return (
		<div className={styles['card-list']}>
			{dataList.map((item, index) => (
				<div key={index} className={styles['card-content']}>
					<Card name={item.name} value={item.value} />
				</div>
			))}
		</div>
	);
};

export default CardList;
