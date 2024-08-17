/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-16 12:48:51
 * @LastEditors: xuehai.xiao xuehai.xiao@meehealth.com
 * @LastEditTime: 2024-08-17 14:22:54
 * @Description:
 */
import useDraw from '@/hooks/useDraw';
import styles from './index.module.less';
import Header from './Header';
import {
	BorderBox10,
	BorderBox11,
	BorderBox12,
	BorderBox8,
	Loading,
	BorderBox13
} from '@jiaminghi/data-view-react';
import { useEffect, useState } from 'react';
import Statistics from './Statistics';
import PieChart from './components/PieChart';
import LineChart from './components/LineChart';
import { getBigScreen, getStore } from '@/api';
import GoodsReferencePrice from './GoodsReferencePrice';
import FoodSafetyCheck from './FoodSafetyCheck';
import GoodsSellRanking from './GoodsSellRanking';
import { ScreenState, StoreItem } from '@/api/index.model';

const Screen = () => {
	const { containerRef } = useDraw();
	const [loading, setLoading] = useState(false);
	const [state, setState] = useState<ScreenState>({
		businessData: {},
		goodsSellRankingList: [],
		goodsReferencePriceList: [],

		foodSafetyCheckList: [],
		businessTypeRatioList: [],

		businessCount: {
			xAxisData: [],
			yAxisData: []
		}
	});
	const [storeList, setStoreList] = useState<StoreItem[]>([]);
	const [storeId, setStoreId] = useState(0);
	async function getStoreList() {
		const { data } = await getStore();
		const [first] = data;
		setStoreId(first.id);
		setStoreList(data);
	}

	async function getScreenData() {
		if (!storeId) return;
		const { data } = await getBigScreen({ id: storeId });
		setState(data);
		setLoading(false);
	}
	useEffect(() => {
		getStoreList();
	}, []);
	useEffect(() => {
		getScreenData();
	}, [storeId]);
	return (
		<div className={styles.app}>
			<div ref={containerRef} className={styles.container}>
				{loading ? (
					<Loading>加载数据中...</Loading>
				) : (
					<div className='h-full flex flex-col'>
						<Header
							storeValue={storeId}
							storeChnage={setStoreId}
							storeList={storeList}
						/>

						<div className='flex-1 flex flex-col'>
							<div className='flex  h-[620px]'>
								<div className='flex-1 flex flex-col'>
									<div className='flex h-1/2'>
										<div className='w-[400px] flex-shrink-0'>
											<BorderBox10>
												<div className='px-4 pt-4 text-lg font-bold'>
													交易分类排行占比
												</div>
												<div
													className='flex-1'
													style={{ height: 'calc(100% - 60px)' }}
												>
													<PieChart data={state.businessTypeRatioList} />
												</div>
											</BorderBox10>
										</div>
										<div className='flex-1'>
											<Statistics data={state.businessData} />
										</div>
									</div>
									<div className='h-1/2'>
										<BorderBox11 className='flex-1' title='日交易额统计'>
											<LineChart data={state.businessCount} />
										</BorderBox11>
									</div>
								</div>

								<div className='w-[400px] flex-shrink-0 h-full'>
									<BorderBox13>
										<div className='px-4 pt-4 text-lg font-bold'>
											商品指导价
										</div>
										<div style={{ height: 'calc(100% - 40px)' }}>
											<GoodsReferencePrice
												data={state.goodsReferencePriceList}
											/>
										</div>
									</BorderBox13>
								</div>
							</div>
							<div className='flex h-[360px]'>
								<div className=' w-1/2'>
									<BorderBox8 className='flex flex-col'>
										<div className='px-4 pt-4 text-lg font-bold'>
											商品售卖排行
										</div>
										<div
											className='flex-1'
											style={{ height: 'calc(100% - 40px)' }}
										>
											<GoodsSellRanking data={state.goodsSellRankingList} />
										</div>
									</BorderBox8>
								</div>
								<div className=' w-1/2'>
									<BorderBox12 className='flex flex-col'>
										<div className='px-4 pt-4 text-lg font-bold'>
											今日检测报告
										</div>
										<div
											className='flex-1'
											style={{ height: 'calc(100% - 40px)' }}
										>
											<FoodSafetyCheck data={state.foodSafetyCheckList} />
										</div>
									</BorderBox12>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Screen;
