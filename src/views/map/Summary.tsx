import monitoring from './iccons/monitoring.png';
import { BorderBox8 } from '@jiaminghi/data-view-react';
export type SummaryProps = {
	count: number;
	title: string;
};
export function Summary({ title, count }: SummaryProps) {
	return (
		<div className='w-full h-24'>
			<BorderBox8 className='bg-[rgba(19,25,47,0.9)]'>
				<div className='w-full h-full flex items-center justify-center gap-x-3 text-base text-white px-2'>
					<img src={monitoring} className='w-16' />
					<div className='flex flex-col items-center gap-1 flex-1'>
						<div className='w-full'>{title}</div>
						<div className='w-full'>{count} 个</div>
					</div>
				</div>
			</BorderBox8>
		</div>
	);
}
