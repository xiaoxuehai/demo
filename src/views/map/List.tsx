/*
 * @Author: xuehai.xiao xuehai.xiao@meehealth.com
 * @Date: 2024-08-17 14:25:26
 * @LastEditors: xuehai.xiao xuehai.xiao@meehealth.com
 * @LastEditTime: 2024-08-17 15:34:30
 * @FilePath: \react-large-screen\src\views\map\List.tsx
 * @Description:
 */
import { ScrollBoard } from '@jiaminghi/data-view-react';
export function List() {
	const config = {
		// 表头背景色
		headerBGC: '#443dc5',
		// 奇数行背景色
		oddRowBGC: '#09184F',
		// 偶数行背景色
		evenRowBGC: '#070C34',
		// 行号
		index: true,
		// 行号表头
		indexHeader: '序号',
		// 宽度
		columnWidth: [50],
		// 对其方式
		align: ['center'],
		// 表行数
		rowNum: 10,
		header: ['地址'],
		data: [
			['洪山体育馆1'],
			['洪山体育馆2'],
			['洪山体育馆3'],
			['洪山体育馆4'],
			['洪山体育馆5'],
			['洪山体育馆6'],
			['洪山体育馆7'],
			['洪山体育馆8'],
			['洪山体育馆9'],
			['洪山体育馆10'],
			['洪山体育馆11'],
			['洪山体育馆12']
		]
	};
	return (
		<ScrollBoard
			config={config}
			style={{
				width: '350px',
				height: 'calc(100vh - 230px)'
			}}
		></ScrollBoard>
	);
}
