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
						班组情况
					</span>
				</motion.h2>
				{/* <motion.div
					variants={itemVariants}
					className='absolute top-1/2 left-1/2 -z-10 gradient w-3/4 -translate-x-1/2 h-3/4 -translate-y-1/2 inset-0 blur-[10rem]'
				></motion.div> */}
				<div className='flex flex-col gap-3'>
					<motion.div
						variants={itemVariants}
						className='rounded-xl bg-black/50 p-2 ring-1 ring-inset ring-foreground/20 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl'
					>
						<div className='p-4'>
							<div className='font-bold text-xl pb-3'>班组人员</div>

							<div className='flex flex-wrap italic gap-3'>
								{[
									'张一三',
									'李四',
									'李五四',
									'王五',
									'赵九六',
									'田七',
									'周八',
									'吴九',
									'郑十',
									'李九四',
									'王五',
									'赵六',
									'田十七',
									'周八',
									'吴十九',
									'郑十',
									'王五',
									'赵六',
									'田七',
									'周十八',
									'吴二九',
									'郑十',
									'李四',
									'王五',
									'赵九六',
									'田七',
									'周八',
									'吴六九',
									'郑十',
									'李四',
									'李五四',
									'王五',
									'赵九六',
									'田七',
									'周八',
									'吴九',
									'郑十',
									'李九四',
									'王五',
									'赵六',
									'田十七',
									'周八',
									'吴十九',
									'郑十',
									'王五',
									'赵六',
									'田七',
									'周十八',
									'吴二九'
								].map((name, index) => (
									<div
										className='border border-gray-500 rounded-full px-4 py-1'
										key={index}
									>
										{name}
									</div>
								))}
							</div>
						</div>
						<BorderBeam size={250} duration={12} delay={9} />
					</motion.div>
					<motion.div
						variants={itemVariants}
						className='rounded-xl bg-black/50 p-2 ring-1 ring-inset ring-foreground/20 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl'
					>
						<div className='p-4 text-base'>
							<div className='font-bold text-xl pb-3'>班组愿景</div>

							<div className='italic'>
								成为智能能源领域的引领者，为社会提供可持续、高效、清洁的能源解决方案。
							</div>
						</div>
						<div className='p-4 text-base'>
							<div className='font-bold text-xl pb-3'>班组口号</div>

							<div className='italic'>智慧能源，创造未来。</div>
						</div>
						<div className='p-4 text-base'>
							<div className='font-bold text-xl pb-3'>班组理念</div>

							<div className='italic'>
								以创新驱动，以科技引领，以协作共赢，为能源行业发展贡献力量。
							</div>
						</div>

						<BorderBeam size={250} duration={12} delay={9} />
					</motion.div>
				</div>
				<motion.div
					variants={itemVariants}
					className='w-full flex justify-end gap-x-4 py-6 sticky bottom-10'
				>
					<SectionBadge title='上一页' to='/landing/about' />
					<SectionBadge title='下一页' to='/landing/case' />
				</motion.div>
			</div>
		</motion.div>
	);
}
