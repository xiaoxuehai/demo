import SectionBadge from '../components/section-badge';
import { motion, Variants } from 'framer-motion';
import { ProjectList } from './ProjectList';

export default function Case() {
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
				staggerChildren: 0.5,
				delayChildren: 0.5
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
						实践案例
					</span>
				</motion.h2>
				{/* <motion.div
					variants={itemVariants}
					className='absolute top-1/2 left-1/2 -z-10 gradient w-3/4 -translate-x-1/2 h-3/4 -translate-y-1/2 inset-0 blur-[10rem]'
				></motion.div> */}
				<ProjectList />
				<motion.div
					variants={itemVariants}
					className='w-full flex justify-end py-6 sticky bottom-10'
				>
					<SectionBadge title='上一页' to='/landing/squad-situation' />
				</motion.div>
			</div>
		</motion.div>
	);
}
