import $styles from './styles/background.module.css';
import { cn } from '@/lib/cn';
//  function Background() {
//   return (
//     <div className={$styles.background}>
//       <span className={$styles['background-bottom-mask']}></span>

//       <span className={$styles['background-left']}></span>
//       <span className={$styles['background-right']}></span>
//       <div className={$styles.content}>
//         <div className={$styles.mask}></div>
//         <div className={$styles['lines-wrapper']}>
//           <div className={$styles.lines}></div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function Background() {
	return (
		<div className='pointer-events-none absolute left-0 top-0 h-screen w-full overflow-hidden'>
			<div
				className='[--gradient-color-1=rgba(0,0,0,1)] [--gradient-color-1=rgba(255,255,255,1)] [--gradient-color-2=rgba(255,255,255,0.8)] [--gradient-color-3=rgba(255,255,255,0)] absolute z-[-1] h-full w-full [--gradient-stop-1:60%] [--gradient-stop-2:85%] lg:[--gradient-stop-1:50%] lg:[--gradient-stop-2:90%]'
				style={{
					background:
						'linear-gradient(180deg, var(--gradient-color-1) 0%, var(--gradient-color-2) var(--gradient-stop-1), var(--gradient-color-3) var(--gradient-stop-2), 100% transparent)'
				}}
			></div>
			<span className={cn('opacity-100', $styles.left_lights)}></span>
			<span className={cn('opacity-100', $styles.right_lights)}></span>
			{/* <span
				className='absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t to-transparent from-black'
				style={{
					zIndex: 30
				}}
			></span> */}

			<div className={$styles.background_container}>
				<div
					className='absolute inset-0 z-[10] [--gradient-stop-1:0px] [--gradient-stop-2:50%] [--geist-foreground:black]'
					style={{
						background:
							'linear-gradient(to top, rgba(0,0,0,0) 0px, var(--geist-foreground) 50%)'
					}}
				></div>
				<div
					className='absolute inset-0'
					style={{
						transform: 'rotateX(75deg)'
					}}
				>
					<div
						className={cn(
							$styles.background_lines,
							'[--left:#223b67] [--right:#4c2638]'
						)}
					></div>
				</div>
			</div>
		</div>
	);
	// return (
	//   <div className='pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden'>
	//     <div
	//       className='[--gradient-color-1=rgba(0,0,0,1)] [--gradient-color-2=rgba(0,0,0,0.8)] [--gradient-color-3=rgba(0,0,0,0)] dark:[--gradient-color-1=rgba(255,255,255,1)] dark:[--gradient-color-2=rgba(255,255,255,0.8)] dark:[--gradient-color-3=rgba(255,255,255,0)] absolute z-[-1] h-full w-full [--gradient-stop-1:60%] [--gradient-stop-2:85%] lg:[--gradient-stop-1:50%] lg:[--gradient-stop-2:90%]'
	//       style={{
	//         background:
	//           'linear-gradient(180deg, var(--gradient-color-1) 0%, var(--gradient-color-2) var(--gradient-stop-1), var(--gradient-color-3) var(--gradient-stop-2), 100% transparent)',
	//       }}
	//     ></div>
	//     <span className='left_lights__L8NEZ opacity-50 dark:opacity-100'></span>
	//     <span className='right_lights__agcl8 opacity-50 dark:opacity-100'></span>
	//     <span className='absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-white to-transparent dark:from-black'></span>

	//     <div className='turbohero-background_container__Vu5AA ![perspective:1000px] sm:![perspective:1000px] md:![perspective:1000px] lg:![perspective:1000px]'>
	//       <div
	//         className='absolute inset-0 z-[100] [--geist-foreground:white] [--gradient-stop-1:0px] [--gradient-stop-2:50%] dark:[--geist-foreground:black]'
	//         style={{
	//           background:
	//             'linear-gradient(to top, rgba(0,0,0,0) 0px, var(--geist-foreground) 50%)',
	//         }}
	//       ></div>
	//       <div
	//         className='absolute inset-0'
	//         style={{
	//           transform: 'rotateX(75deg)',
	//         }}
	//       >
	//         <div className='turbohero-background_lines__UYrFE'></div>
	//       </div>
	//     </div>
	//   </div>
	// );
}
