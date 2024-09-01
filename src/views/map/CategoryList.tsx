import { ScrollRankingBoard } from '@jiaminghi/data-view-react';
import { DataType } from './index2';
export function CategoryList({ data }: { data: DataType[] }) {
	const config = {
		data: data.map(item => ({ name: item.name, value: item.children.length })),
		rowNum: 6,
		unit: '个'
	};
	return (
		<ScrollRankingBoard
			config={config}
			style={{ width: '100%', height: '100%' }}
		/>
	);
}
