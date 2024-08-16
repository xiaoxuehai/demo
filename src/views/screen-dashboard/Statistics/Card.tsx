/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-27 09:54:12
 * @LastEditors: 肖 学海 1379228273@qq.com
 * @LastEditTime: 2022-12-27 10:12:57
 * @Description:
 */
import { FC } from 'react';
import styles from './index.module.less';
type CardProps = {
	name: string;
	value: number;
};
const Card: FC<CardProps> = props => {
	return (
		<div className={styles.card}>
			<div className={styles.name}>{props.name}</div>
			<div className={styles.value}>{props.value}</div>
		</div>
	);
};

export default Card;
