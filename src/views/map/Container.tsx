import { cn } from '@/lib/cn';
import { ComponentProps } from 'react';

export function Container({
	className,
	children,
	...rest
}: ComponentProps<'div'>) {
	return (
		<div
			className={cn(
				'flex flex-col w-[380px] shadow-[0_0_3px_#1c4e90] bg-[rgba(6,30,93,.5)] border-t-[4px] border-t-[rgba(1,153,209,.5)]',
				className
			)}
			{...rest}
		>
			{children}
		</div>
	);
}
