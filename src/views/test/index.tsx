import React, { useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-flvjs';
export default function Test() {
	const rtmpStreamUrl =
		'blob:https://www.skylinewebcams.com/89ca34a2-9d9e-45d6-b0f9-c1e1b726ae50';
	// useEffect(() => {
	// 	const videoElement = document.getElementById('my-video');
	// 	if (!videoElement) return;

	// 	const player = videojs(videoElement, {
	// 		autoplay: true,
	// 		controls: true,
	// 		sources: [
	// 			{
	// 				src: rtmpStreamUrl,
	// 				type: 'rtmp/flv'
	// 			}
	// 		]
	// 	});

	// 	return () => {
	// 		if (player) {
	// 			player.dispose();
	// 		}
	// 	};
	// }, [rtmpStreamUrl]);

	return (
		<video
			id='my-video'
			src='blob:https://www.skylinewebcams.com/89ca34a2-9d9e-45d6-b0f9-c1e1b726ae50'
			className='video-js vjs-default-skin'
		></video>
	);
}
