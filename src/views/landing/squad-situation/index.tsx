import React from 'react';
import { BorderBeam } from '../components/border-beam';
import SectionBadge from '../components/section-badge';
import { motion, Variants } from 'framer-motion';
import { Table } from '@arco-design/web-react';
import organization from './organization.png';
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
	const twoCharNames = [
		'张三',
		'李四',
		'王五',
		'赵六',
		'孙七',
		'周八',
		'吴九',
		'郑十',
		'陈一',
		'刘二'
	];
	const threeCharNames = [
		'欧阳明',
		'司马强',
		'诸葛亮',
		'东方雪',
		'南宫月',
		'西门风',
		'公孙羽',
		'令狐冲',
		'慕容云',
		'皇甫轩',
		'尉迟琳',
		'端木瑶',
		'淳于俊',
		'太史媛',
		'呼延阳',
		'赫连雨',
		'轩辕海',
		'钟离梦',
		'拓跋宇',
		'长孙悦',
		'独孤影',
		'万俟辉',
		'漆雕燕',
		'公冶梅',
		'谷梁兰',
		'宰父竹',
		'夹谷菊',
		'百里枫',
		'东郭松',
		'南门柳',
		'呼延婷'
	];
	const fourCharNames = [
		'上官婉儿',
		'宇文成都',
		'长孙无忌',
		'尉迟恭德',
		'司马相如',
		'纳兰性德',
		'司徒兰芳',
		'端木蕻良',
		'呼延灼华',
		'轩辕逸飞',
		'钟离梓萱',
		'拓跋弘毅',
		'独孤求败'
	];

	const allNames = [...twoCharNames, ...threeCharNames, ...fourCharNames];
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
				<div className='flex flex-col gap-5'>
					<motion.div
						variants={itemVariants}
						className='rounded-xl bg-black/50 p-2 ring-1 ring-inset ring-foreground/20 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl'
					>
						<div className='p-4'>
							<div className='font-bold text-xl pb-3'>
								班组人员（共{allNames.length}人）
							</div>

							<div className='flex flex-wrap italic gap-3'>
								{allNames.map((name, index) => (
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
					<motion.div
						variants={itemVariants}
						className='rounded-xl bg-black/50 p-2 ring-1 ring-inset ring-foreground/20 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl'
					>
						<div className='p-4 text-base'>
							<div className='font-bold text-xl pb-3'>组织架构</div>

							<img src={organization} className='w-full' />
						</div>

						<BorderBeam size={250} duration={12} delay={9} />
					</motion.div>
					<motion.div
						variants={itemVariants}
						className='rounded-xl bg-black/50 p-2 ring-1 ring-inset ring-foreground/20 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl'
					>
						<div className='p-4 text-base'>
							<div className='font-bold text-xl pb-3'>值班安排</div>

							<div className='italic'>
								<Table
									pagination={false}
									columns={[
										{
											title: '日期',
											dataIndex: 'a'
										},
										{
											title: '值班人员',
											dataIndex: 'b'
										},
										{
											title: '值班时间',
											dataIndex: 'c'
										}
									]}
									data={[
										{
											a: '2024-09-12',
											b: '张三',
											c: '08:00 - 16:00'
										},
										{
											a: '2024-09-13',
											b: '李四',
											c: '08:00 - 16:00'
										},
										{
											a: '2024-09-14',
											b: '王五',
											c: '08:00 - 16:00'
										},
										{
											a: '2024-09-15',
											b: '赵六',
											c: '08:00 - 16:00'
										},
										{
											a: '2024-09-16',
											b: '邓七',
											c: '08:00 - 16:00'
										}
									]}
								/>
							</div>
						</div>

						<BorderBeam size={250} duration={12} delay={9} />
					</motion.div>
					<motion.div
						variants={itemVariants}
						className='rounded-xl bg-black/50 p-2 ring-1 ring-inset ring-foreground/20 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl'
					>
						<div className='p-4 text-base'>
							<div className='font-bold text-xl pb-3'>每月考勤</div>

							<div className='italic'>
								<Table
									pagination={false}
									columns={[
										{
											title: '员工姓名',
											dataIndex: 'a'
										},
										{
											title: '出勤天数',
											dataIndex: 'b'
										},
										{
											title: '请假天数',
											dataIndex: 'c'
										},
										{
											title: '迟到次数',
											dataIndex: 'd'
										},
										{
											title: '早退次数',
											dataIndex: 'e'
										}
									]}
									data={[
										{
											a: '张三',
											b: 22,
											c: 2,
											d: 1,
											e: 4
										},
										{
											a: '李四',
											b: 22,
											c: 0,
											d: 0,
											e: 1
										},
										{
											a: '王五',
											b: 22,
											c: 1,
											d: 0,
											e: 0
										},
										{
											a: '赵六',
											b: 22,
											c: 0,
											d: 0,
											e: 0
										},
										{
											a: '邓七',
											b: 22,
											c: 0,
											d: 0,
											e: 0
										}
									]}
								/>
							</div>
						</div>

						<BorderBeam size={250} duration={12} delay={9} />
					</motion.div>
					<motion.div
						variants={itemVariants}
						className='rounded-xl bg-black/50 p-2 ring-1 ring-inset ring-foreground/20 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl'
					>
						<div className='p-4 text-base'>
							<div className='font-bold text-xl pb-3'>绩效管理</div>

							<div className='italic'>
								<Table
									pagination={false}
									columns={[
										{
											title: '员工姓名',
											dataIndex: 'a'
										},
										{
											title: '工作任务完成率',
											dataIndex: 'b'
										},
										{
											title: '工作质量评分',
											dataIndex: 'c'
										},
										{
											title: '团队协作评分',
											dataIndex: 'd'
										},
										{
											title: '绩效总分',
											dataIndex: 'e'
										}
									]}
									data={[
										{
											a: '张三',
											b: '90%',
											c: 89,
											d: 89,
											e: 67
										},
										{
											a: '李四',
											b: '90%',
											c: 98,
											d: 96,
											e: 99
										},
										{
											a: '王五',
											b: '90%',
											c: 96,
											d: 94,
											e: 91
										},
										{
											a: '赵六',
											b: '98%',
											c: 80,
											d: 83,
											e: 88
										},
										{
											a: '邓七',
											b: '94%',
											c: 89,
											d: 98,
											e: 91
										}
									]}
								/>
							</div>
						</div>

						<BorderBeam size={250} duration={12} delay={9} />
					</motion.div>
					<motion.div
						variants={itemVariants}
						className='rounded-xl bg-black/50 p-2 ring-1 ring-inset ring-foreground/20 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl'
					>
						<div className='p-4 text-base'>
							<div className='font-bold text-xl pb-3'>违章曝光</div>

							<div className='italic'>
								<Table
									pagination={false}
									columns={[
										{
											title: '员工姓名',
											dataIndex: 'a'
										},
										{
											title: '违章事项',
											dataIndex: 'b'
										},
										{
											title: '违章时间',
											dataIndex: 'c'
										},
										{
											title: '处理结果',
											dataIndex: 'd'
										}
									]}
									data={[
										{
											a: '张三',
											b: '未按规定佩戴安全帽',
											c: '2024-09-10 15:30',
											d: '警告并罚款 100 元'
										},
										{
											a: '李四',
											b: '未按规定佩戴安全帽',
											c: '2024-09-10 12:30',
											d: '警告并罚款 50 元'
										},
										{
											a: '王五',
											b: '在禁烟区吸烟',
											c: '2024-09-14 10:30',
											d: '警告并罚款 50 元'
										}
									]}
								/>
							</div>
						</div>

						<BorderBeam size={250} duration={12} delay={9} />
					</motion.div>

					<motion.div
						variants={itemVariants}
						className='rounded-xl bg-black/50 p-2 ring-1 ring-inset ring-foreground/20 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl'
					>
						<div className='p-4 text-base'>
							<div className='font-bold text-xl pb-3'>技术措施</div>

							<div className='italic'>
								<p>安装智能电表，实现远程抄表和实时监测用电情况。</p>
								<p>采用无功补偿技术，提高电网功率因数，降低线路损耗。</p>
								<p>部署电力巡检机器人，提高巡检效率和准确性。</p>
								<p>建设智能变电站，实现自动化控制和远程监控。</p>
								<p>应用节能变压器，降低能源消耗。</p>
							</div>
						</div>
						<div className='p-4 text-base'>
							<div className='font-bold text-xl pb-3'>安全事件</div>

							<div className='italic'>
								<p>
									某变电站遭受雷击，导致部分设备损坏，紧急启动应急预案进行抢修。
								</p>
								<p>
									一名工作人员在进行高空作业时未正确佩戴安全带，险些发生坠落事故，加强了安全培训和监督。
								</p>
								<p>
									发现一处电线老化引发短路，及时更换电线并对线路进行全面检查。
								</p>
								<p>遭遇强风天气，部分电线杆倾斜，迅速组织力量进行加固。</p>
								<p>
									有人在电力设施附近违规施工，危及电网安全，及时制止并进行安全教育。
								</p>
							</div>
						</div>
						<div className='p-4 text-base'>
							<div className='font-bold text-xl pb-3'>学习培训</div>

							<div className='italic'>
								<p>举办电力安全操作规程培训，强化员工安全意识。</p>
								<p>组织智能电网技术培训，提升员工对新技术的掌握程度。</p>
								<p>开展应急救援演练，提高员工应对突发事件的能力。</p>
								<p>进行电气设备维护培训，确保设备正常运行。</p>
								<p>安排电力法律法规培训，增强员工的法律意识。</p>
							</div>
						</div>
						<div className='p-4 text-base'>
							<div className='font-bold text-xl pb-3'>其他资料</div>

							<div className='italic'>
								<p>电力设备维护手册。</p>
								<p>电网运行年度报告。</p>
								<p>新能源发电技术介绍文档。</p>
								<p>电力安全宣传海报。</p>
								<p>电力工程设计标准规范。</p>
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
