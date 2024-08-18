import { ScrollRankingBoard } from '@jiaminghi/data-view-react';
export function Right({ data }: any) {
	const config = {
		data: data.map(item => ({ name: item.title, value: item.count })),
		rowNum: 8,
		unit: '个'
	};
	return (
		<ScrollRankingBoard
			config={config}
			style={{ width: '100%', height: '100%' }}
		/>
	);
}
