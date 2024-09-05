// import monitoring from './iccons/monitoring.png';
import { BorderBox8 } from '@jiaminghi/data-view-react';
export type SummaryProps = {
	count: number;
	title: string;
};
export function Summary({ title, count }: SummaryProps) {
	return (
		<div className='w-full h-28'>
			<BorderBox8 className='bg-[rgba(6,30,93,.5)]'>
				<div className='w-full h-full flex items-center justify-center gap-x-3 text-2xl text-white'>
					{/* <img src={monitoring} className='w-20' /> */}
					<div className='flex flex-col items-center gap-3'>
						<div>{title}</div>
						<div>{count} 个</div>
					</div>
				</div>
			</BorderBox8>
		</div>
	);
}
