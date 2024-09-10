import React from 'react';
import { BorderBeam } from '../components/border-beam';
import SectionBadge from '../components/section-badge';
import { motion, Variants } from 'framer-motion';

export default function About() {
	enum Animate {
		Show = 'show',
		Hidden = 'hidden'
	}
	const listVariants: Variants = {
		[Animate.Hidden]: {
			opacity: 0
		},
		[Animate.Show]: {
			opacity: 1,
			transition: {
				staggerChildren: 0.3,
				delayChildren: 0.3
			}
		}
	};
	const itemVariants: Variants = {
		[Animate.Hidden]: {
			filter: 'blur(15px)',
			x: -150,
			scale: 0.7,
			opacity: 0,
			transition: { duration: 0.6 }
		},
		[Animate.Show]: {
			filter: 'blur(0px)',
			x: 0,
			scale: 1,
			opacity: 1,
			transition: { duration: 0.6 }
		}
	};
	return (
		<motion.div
			initial={Animate.Hidden}
			animate={Animate.Show}
			variants={listVariants}
			className='relative w-full h-full flex flex-col items-center'
		>
			{/* <div className='absolute inset-0 dark:bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] h-[150vh]' /> */}
			<div className='relative flex pb-8 flex-col justify-center items-center w-[1000px]'>
				<motion.h2
					variants={itemVariants}
					className='text-4xl pb-6 w-full font-[YouShe]'
				>
					<span
					// style={{
					// 	background: '-webkit-linear-gradient(45deg, #ffaa40, #9c40ff)',
					// 	backgroundClip: 'text',
					// 	WebkitTextFillColor: 'transparent'
					// }}
					>
						公司介绍
					</span>
				</motion.h2>
				{/* <motion.div
					variants={itemVariants}
					className='absolute top-1/2 left-1/2 -z-10 gradient w-3/4 -translate-x-1/2 h-3/4 -translate-y-1/2 inset-0 blur-[10rem]'
				></motion.div> */}
				<motion.div
					variants={itemVariants}
					className='rounded-xl bg-black/50 p-2 ring-1 ring-inset ring-foreground/20 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl'
				>
					<div className='w-full p-4 box-border text-xl leading-[44px] italic indent-10'>
						国电投（陵水）智慧能源有限公司成立于2021年，主要为海南陵水黎安国际教育创新试验区提供集中供冷和直饮水服务，同时负责陵水、三亚、保亭区域的分布式光伏发电项目和充电桩项目的建设运营管理。公司现有包括专业技术人员在内的产业工人19人，数量约占公司员工总数的42%。产业工人队伍作为产业发展的必要条件，是影响产业构建和升级的关键因素之一，随着公司产业布局的拓展和改造升级，产业工人结构不够合理、技术技能缺乏等问题逐渐显露，亟待通过引进和培养等多种方式来服务公司产业发展。因此，在新时代加快推进产业工人队伍建设，以人才驱动加快综合能源核心业务产业工人技术技能提升显得十分必要。
						陵水公司响应集团公司企业核心业务自主实施的号召，立足实际，创新方式方法，重点通过思想引领、平台搭建、机制激励，推动产业工人队伍建设改革纵深发展，重点打造综合能源核心业务自主运营能力建设。
					</div>

					<BorderBeam size={250} duration={12} delay={9} />
				</motion.div>
				<motion.div
					variants={itemVariants}
					className='w-full flex justify-end py-6 sticky bottom-10'
				>
					<SectionBadge title='下一页' to='/landing/squad-situation' />
				</motion.div>
			</div>
		</motion.div>
	);
}
