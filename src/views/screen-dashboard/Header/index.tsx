/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-16 13:43:22
 * @LastEditors: 肖 学海 1379228273@qq.com
 * @LastEditTime: 2023-01-05 14:41:21
 * @Description:
 */
import {
	Decoration10,
	Decoration8,
	Decoration6
} from '@jiaminghi/data-view-react';
import styles from './index.module.less';
import cs from 'classnames';
import { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getAppEnvConfig } from '@/utils/env';
import { Select } from '@arco-design/web-react';
import { StoreItem } from '@/api/index.model';
type HeaderProps = {
	storeValue: number;
	storeChnage: (value: number) => void;
	storeList: StoreItem[];
};
const Header: FC<HeaderProps> = props => {
	const { VITE_APP_TITLE } = getAppEnvConfig();
	const [time, setTime] = useState('');
	const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

	useEffect(() => {
		setInterval(() => {
			setTime(
				`${dayjs().format('YYYY-MM-DD HH:mm:ss')}  ${weeks[dayjs().day()]}`
			);
		}, 1000);
	}, []);

	return (
		<div className={styles.header}>
			<Decoration10 className={styles.Decoration10} />
			<div className={cs(styles.trapezium, styles.store)}>
				<span className={styles.text}>
					<span className={styles['store-title']}>当前门店：</span>
					<Select
						bordered={false}
						size='large'
						value={props.storeValue}
						onChange={props.storeChnage}
						triggerElement={({ value }) => {
							const store = props.storeList.find(item => item.id === value);
							return (
								<div className='w-[300px] h-[40px] cursor-pointer font-bold'>
									{store?.name}
								</div>
							);
						}}
					>
						{props.storeList.map(item => (
							<Select.Option key={item.id} value={item.id}>
								{item.name}
							</Select.Option>
						))}
					</Select>
				</span>
			</div>
			<div className={styles.middle}>
				<Decoration8
					className={styles.Decoration8}
					color={['#568aea', '#000000']}
				/>
				<div className={styles.title}>
					<div className={styles.text}>{VITE_APP_TITLE}</div>
					<Decoration6
						className={styles.Decoration6}
						reverse={true}
						color={['#50e3c2', '#67a1e5']}
					/>
				</div>

				<Decoration8
					className={styles.Decoration8}
					reverse={true}
					color={['#568aea', '#000000']}
				/>
			</div>
			<Decoration10 className={cs(styles.Decoration10, styles.reverse)} />

			<div className={cs(styles.trapezium, styles.time)}>
				<span className={styles.text}>{time}</span>
			</div>
		</div>
	);
};

export default Header;
