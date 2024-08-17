import monitoring from './iccons/monitoring.png';
import { BorderBox8 } from '@jiaminghi/data-view-react';
export type SummaryProps = {
	count: number;
	title: string;
};
export function Summary({ title, count }: SummaryProps) {
	return (
		<div className='w-72 h-36'>
			<BorderBox8 className='bg-[rgba(19,25,47,0.9)]'>
				<div className='w-full h-full flex items-center justify-center gap-x-3 text-3xl text-white'>
					<img src={monitoring} className='w-24' />
					<div className='flex flex-col items-center gap-4'>
						<div>{title}</div>
						<div>{count} 个</div>
					</div>
				</div>
			</BorderBox8>
		</div>
	);
}
