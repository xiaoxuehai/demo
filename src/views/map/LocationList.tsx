/*
 * @Author: xuehai.xiao xuehai.xiao@meehealth.com
 * @Date: 2024-08-17 14:25:26
 * @LastEditors: xuehai.xiao xuehai.xiao@meehealth.com
 * @LastEditTime: 2024-08-17 15:34:30
 * @FilePath: \react-large-screen\src\views\map\LocationList.tsx
 * @Description:
 */

import { useMemo, useState } from 'react';
import { DataType } from './index2';
import { Descriptions, Popover } from '@arco-design/web-react';
import ScrollBoard from '@/components/ScrollBoard';
export function LocationList({
	data,
	onCellClick
}: {
	data: DataType['children'];
	onCellClick: (params: Recordable) => void;
}) {
	const config = useMemo(() => {
		return {
			// 表头背景色
			headerBGC: '#1370fb',
			// 奇数行背景色
			oddRowBGC: '#09184F',
			// 偶数行背景色
			evenRowBGC: '#070C34',
			// 行号
			index: true,
			// 行号表头
			indexHeader: '序号',
			// 宽度
			columnWidth: [60],
			// 对其方式
			align: ['center'],
			// 表行数
			rowNum: 12,
			header: ['地址'],
			data: data.map(item => [item.address])
		};
	}, [data]);
	const [hoverRowIndex, setHoverRowIndex] = useState(-1);
	return (
		<ScrollBoard
			config={config}
			style={{
				width: '100%',
				height: '100%'
			}}
			renderRow={(originalNode, rowIndex, rowData) => {
				const item = data[rowData.rowIndex];

				return (
					<Popover
						key={`${rowData.toString()}-${rowData.scroll}`}
						title='详情'
						position='left'
						style={{ width: 800, maxWidth: 800 }}
						onVisibleChange={visible =>
							setHoverRowIndex(visible ? rowIndex : -1)
						}
						popupVisible={hoverRowIndex === rowIndex}
						content={
							<Descriptions
								className='w-full'
								valueStyle={{ height: 60 }}
								labelStyle={{ height: 60 }}
								border
								column={2}
								data={item?.details.map(detail => ({
									...detail,
									value: detail.value || '-'
								}))}
							/>
						}
					>
						{originalNode}
					</Popover>
				);
			}}
			onCellClick={data => {
				setHoverRowIndex(-1);
				onCellClick(data);
			}}
		/>
	);
}
