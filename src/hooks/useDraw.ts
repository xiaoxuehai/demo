/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-16 12:39:09
 * @LastEditors: 肖 学海 1379228273@qq.com
 * @LastEditTime: 2022-12-27 09:07:28
 * @Description:
 */
import { debounce } from 'lodash-es';
import { useEffect, useRef } from 'react';

export default function useDraw() {
	// * 指向最外层容器
	const containerRef = useRef<HTMLDivElement | null>(null);

	// * 默认缩放值
	const scale = {
		width: '1',
		height: '1'
	};
	// * 设计稿尺寸（px）
	const baseWidth = 1920;
	const baseHeight = 1080;

	// * 需保持的比例（默认1.77778）
	const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5));
	const calcRate = () => {
		// 当前宽高比
		const currentRate = parseFloat(
			(window.innerWidth / window.innerHeight).toFixed(5)
		);
		if (containerRef.current) {
			if (currentRate > baseProportion) {
				// 表示更宽
				scale.width = (
					(window.innerHeight * baseProportion) /
					baseWidth
				).toFixed(5);
				scale.height = (window.innerHeight / baseHeight).toFixed(5);
				containerRef.current.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`;
			} else {
				// 表示更高
				scale.height = (
					window.innerWidth /
					baseProportion /
					baseHeight
				).toFixed(5);
				scale.width = (window.innerWidth / baseWidth).toFixed(5);
				containerRef.current.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`;
			}
		}
	};

	const resize = debounce(function () {
		calcRate();
	}, 100);

	useEffect(() => {
		window.addEventListener('resize', resize);
		calcRate();
		return () => {
			window.removeEventListener('resize', resize);
		};
	}, []);
	return {
		containerRef
	};
}
