/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-16 13:43:22
 * @LastEditors: xuehai.xiao xuehai.xiao@meehealth.com
 * @LastEditTime: 2024-08-17 15:37:44
 * @Description:
 */
import {
	Decoration10,
	Decoration8
	// Decoration6
} from '@jiaminghi/data-view-react';
import styles from './index.module.less';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getAppEnvConfig } from '@/utils/env';
import { cn } from '@/lib/cn';
import { IconSettings } from '@arco-design/web-react/icon';

// import { Select } from '@arco-design/web-react';

const Header = ({ onSetting }: { onSetting: () => void }) => {
	const { VITE_APP_TITLE } = getAppEnvConfig();
	const [time, setTime] = useState('');
	const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

	useEffect(() => {
		setInterval(() => {
			setTime(`${dayjs().format('YYYY-MM-DD HH:mm:ss')}`);
		}, 1000);
	}, []);
	const [fullScreen, setFullScreen] = useState(false);

	return (
		<>
			<div className={cn(styles.header, 'cursor-pointer')}>
				<Decoration10 className={styles.Decoration10} />
				<div className={cn(styles.trapezium, styles.left)}>
					<span className={cn(styles.text, 'px-5')}>
						<IconSettings className='cursor-pointer' onClick={onSetting} />
					</span>
				</div>
				<div className={styles.middle}>
					<Decoration8
						className={styles.Decoration8}
						color={['#568aea', '#000000']}
					/>
					<div
						className={styles.title}
						onClick={() => {
							if (fullScreen) {
								document.exitFullscreen();
							} else {
								document.documentElement.requestFullscreen();
							}
							setFullScreen(!fullScreen);
						}}
					>
						<div className={styles.text}>{VITE_APP_TITLE}</div>
						{/* <Decoration6
						className={styles.Decoration6}
						reverse={true}
						color={['#50e3c2', '#67a1e5']}
					/> */}
					</div>

					<Decoration8
						className={styles.Decoration8}
						reverse={true}
						color={['#568aea', '#000000']}
					/>
				</div>
				<Decoration10 className={cn(styles.Decoration10, styles.reverse)} />

				<div className={cn(styles.trapezium, styles.right)}>
					<span className={styles.text}>{time}</span>
					<span className={styles.weekday}>{weeks[dayjs().day()]}</span>
				</div>
			</div>
		</>
	);
};

export default Header;
