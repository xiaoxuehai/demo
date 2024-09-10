import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

type Props = LinkProps & {
	title: string;
};

const SectionBadge = ({ title, ...rest }: Props) => {
	return (
		<Link
			{...rest}
			className='relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none select-none font-[YouShe]'
		>
			<span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1d4ed8_0%,#a5b4fc_50%,#1d4ed8_100%)]' />
			<span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-base font-medium text-white backdrop-blur-3xl'>
				{title}
			</span>
		</Link>
	);
};

export default SectionBadge;
