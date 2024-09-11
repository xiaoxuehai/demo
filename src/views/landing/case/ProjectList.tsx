'use client';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';

import { Animate } from '../enum';
import image1 from './images/image1.png';
import image2 from './images/image2.png';
import image3 from './images/image3.png';
import image4 from './images/image4.png';
const data = [
	{
		title: '班组安全教育',
		image: image1,
		description:
			'班组是公司最基层的安全生产组织，是落实规章制度和安全操作规程的前沿阵地，安全教育培训从班组抓起，落地生根。培训内容包括：公司的安全文化、两票三制、事故事件隐患排查通报、安全事故案例、岗位风险辨识等。听一番主讲人的安全知识讲解，读一段亲情安全寄语，激励基层员工用心领悟、真心接受企业安全文化的内涵和意义'
	},
	{
		title: '现场安全知识问答',
		image: image2,
		description:
			'通过与班组员工的交流，充分了解到员工的安全需求，全面掌握员工的安全生产动态，也能检验各班组成员安全培训成效。面对面的互动交流既能让员工感受到班组的严格管理，又能让员工感受到真诚和关爱。互动交流能促使员工发自内心地认同企业安全文化价值观，激发员工对安全工作的积极性和创造性，积极引导每一名员工从“要我安全”向“我要安全、我会安全、我能安全”转变。'
	},
	{
		title: '丰富班组工余活动',
		image: image3,
		description:
			'如果班组有“性格”，那么国电投陵水公司运行班组绝对是内敛进取型。在公司整体文化的熏陶下，运行班组凝聚力、战斗力持续增强，在历次重要保供任务中发挥突出作用，多次获得公司领导表扬，2023 年荣获陵水公司安全生产先进集体，还被授予国家电投海南公司“班组安全建设达标班组”称号。这群朝气蓬勃的年轻人下班后最爱做的事就是相约一起跑步、打羽毛球、踢踢足球。他们利用休息时间找到其他球友来场激烈的足球比赛，不但增强体质，更塑造了大家互相配合、争先创优的团队精神。'
	},
	{
		title: '自己干，打造一岗多能团队',
		image: image4,
		description:
			'供冷是陵水公司目前核心主营业务，主营业务自主实施是建设全业务核心班组的根本途径，核心业务不仅要“自己干”“干得精”，常规业务和其他业务也要“干得了”“管得住”。今年来，陵水公司以技能培训、作业执行、技能竞赛为主线，打造“一专多能”队伍，业务涉及分布式光伏、直饮水、农业种植、充电桩等领域，力求全面提升班组技能水平。 年荣获陵水公司安全生产先进集体，还被授予国家电投海南公司“班组安全建设达标班组”称号。这群朝气蓬勃的年轻人下班后最爱做的事就是相约一起跑步、打羽毛球、踢踢足球。他们利用休息时间找到其他球友来场激烈的足球比赛，不但增强体质，更塑造了大家互相配合、争先创优的团队精神。'
	}
];
export function ProjectList() {
	const listVariants: Variants = {
		[Animate.Hidden]: {
			opacity: 0
		},
		[Animate.Show]: {
			opacity: 1,
			transition: {
				staggerChildren: 0.3,
				delayChildren: 0.3,
				delay: 0.3
			}
		}
	};
	const itemVariants: Variants = {
		[Animate.Hidden]: {
			filter: 'blur(10px)',
			y: -100,
			opacity: 0,
			scale: 0.8,
			transition: {
				duration: 0.3,
				y: { stiffness: 100 }
			}
		},
		[Animate.Show]: {
			filter: 'blur(0px)',
			y: 0,
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.5,
				y: { stiffness: 100 }
			}
		}
	};
	return (
		<motion.ul
			className='flex flex-col relative gap-y-8 py-4 w-[1000px]'
			initial={Animate.Hidden}
			animate={Animate.Show}
			variants={listVariants}
		>
			{data.map((item, index) => (
				<motion.li
					className='group relative p-4 bg-zinc-800/50 rounded-md'
					variants={itemVariants}
					key={index}
				>
					<div className='relative z-10'>
						<h2 className='text-xl font-semibold text-zinc-100'>
							{item.title}
						</h2>

						<div className='pt-5 flex gap-x-5'>
							<div className='w-[420px] rounded-md flex-shrink-0 overflow-hidden'>
								<img src={item.image} className='w-full' />
							</div>
							<p className='italic text-base leading-9'>{item.description}</p>
						</div>
					</div>
				</motion.li>
			))}
		</motion.ul>
	);
}
