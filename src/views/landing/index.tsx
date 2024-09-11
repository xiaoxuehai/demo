/*
 * @Author: xuehai.xiao xuehai.xiao@meehealth.com
 * @Date: 2024-09-11 11:49:37
 * @LastEditors: xuehai.xiao xuehai.xiao@meehealth.com
 * @LastEditTime: 2024-09-11 13:46:51
 * @FilePath: \demo\src\views\landing\index.tsx
 * @Description:
 */
import { motion, Variants } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { Animate } from './enum';
import Background from './Background';
import logo from './logo.png';
export default function Landing() {
	const variants: Variants = {
		[Animate.Hidden]: {
			filter: 'blur(30px)',
			opacity: 0,
			y: -150,
			scale: 0.5,
			transition: {
				duration: 0.8
			}
		},
		[Animate.Show]: {
			filter: 'blur(0px)',
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.8
			}
		}
	};
	return (
		<div className='flex flex-col bg-background text-foreground antialiased h-full overflow-y-auto'>
			<Background />
			<motion.h2
				initial={Animate.Hidden}
				animate={Animate.Show}
				variants={variants}
				className='font-[YouShe] text-4xl text-center py-14 w-[1000px] my-0 mx-auto relative'
				style={{
					background: '-webkit-linear-gradient(45deg, #ffaa40, #9c40ff)',
					backgroundClip: 'text',
					WebkitTextFillColor: 'transparent'
				}}
			>
				<img
					src={logo}
					className='w-auto h-20 absolute top-1/2 left-0 -translate-y-1/2'
				/>
				悉心尽心 为设备保驾 为生产护航
			</motion.h2>
			<div className='flex-1'>
				<Outlet />
			</div>
		</div>
	);
}
