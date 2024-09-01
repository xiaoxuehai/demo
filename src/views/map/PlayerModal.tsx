import { Modal, ModalProps } from '@arco-design/web-react';
// import ReactPlayer from 'react-player';

export type PlayerModalProps = ModalProps;
export function PlayerModal({ ...rest }: PlayerModalProps) {
	return (
		<Modal
			className='w-auto'
			title='监控视频'
			footer={cancelButtonNode => cancelButtonNode}
			{...rest}
		>
			<video autoPlay muted className='w-[600px] h-[440px]'>
				<source src='/video.webm' type='video/mp4' />
			</video>
			{/* <ReactPlayer
				muted
				pl
				url='rtmp://liteavapp.qcloud.com/live/liteavdemoplayerstreamid'
			/> */}
		</Modal>
	);
}
