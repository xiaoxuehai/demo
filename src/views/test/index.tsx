import { cn } from '@/lib/cn';
import { useEffect, useRef, useState } from 'react';
import { WebRtcStreamer } from './webrtcstreamer';
import './index.less';
export default function Test() {
	const [state, setState] = useState({
		webRtcServer: null,
		clickCount: 0, // 用来计数点击次数
		rtsp: 'rtsp://stream.strba.sk:1935/strba/VYHLAD_JAZERO.stream',
		isOn: false,
		selectStatus: false
	});
	const videoRef = useRef(null);
	useEffect(() => {
		initVideo();
	}, [state.rtsp]);
	function initVideo() {
		state.webRtcServer?.disconnect();
		try {
			//连接后端的IP地址和端口
			const webRtcServer = new WebRtcStreamer(
				videoRef.current,
				// 172.17.64.33
				// 192.168.3.4
				`http://127.0.1:8000`
			);
			//向后端发送rtsp地址
			webRtcServer.connect(state.rtsp);
			setState(prev => ({ ...prev, webRtcServer }));
		} catch (error) {
			console.log(error);
		}
	}
	/* 处理双击 单机 */
	function dbClick() {
		state.clickCount++;
		if (state.clickCount === 2) {
			btnFull(); // 双击全屏

			setState(prev => ({ ...prev, clickCount: 0 }));
		}
		setTimeout(() => {
			if (state.clickCount === 1) {
				setState(prev => ({ ...prev, clickCount: 0 }));
			}
		}, 250);
	}
	/* 视频全屏 */
	function btnFull() {
		const elVideo = videoRef.current;
		if (elVideo.webkitRequestFullScreen) {
			elVideo.webkitRequestFullScreen();
		} else if (elVideo.mozRequestFullScreen) {
			elVideo.mozRequestFullScreen();
		} else if (elVideo.requestFullscreen) {
			elVideo.requestFullscreen();
		}
	}
	/* 
	  ison用来判断是否需要更换视频流
	  dbclick函数用来双击放大全屏方法
	  */
	function handleClickVideo() {
		if (state.isOn) {
			dbClick();
		} else {
			btnFull();
		}
	}
	return (
		<div id='video-contianer'>
			<video
				className='video'
				ref={videoRef}
				preload='auto'
				autoPlay
				muted
				width='600'
				height='400'
			/>
			<div
				className={cn('mask', state.selectStatus && 'active-video-border')}
				onClick={handleClickVideo}
			></div>
		</div>
	);
}
