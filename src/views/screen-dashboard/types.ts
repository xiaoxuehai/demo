/*
 * @Author: 肖 学海 1379228273@qq.com
 * @Date: 2022-12-30 16:36:15
 * @LastEditors: 肖 学海 1379228273@qq.com
 * @LastEditTime: 2022-12-30 16:37:56
 * @Description:
 */
export type BusinessData = Partial<{
	incomeAmount: number;
	// 营业额
	orderCount: number;
	// 客单量
	guestPrice: number;
	// 客单价
	addMemberCount: number;
	// 新增会员数
	memberConsume: number;
	// 会员消费
	memberStored: number;
	// 会员储值
}>;
/**
 * @description: 商品售卖排名
 */
export type GoodsSellRankingList = {
	goodsId: number;
	// 商品Id
	goodsName: string;
	// 商品名称
	quantity: string;
	// 数量
	amount: number;
	// 金额
}[];
/**
 * @description: 商品指导价
 */
export type GoodsReferencePriceList = {
	goodsId: number;
	// 商品Id
	goodsName: string;
	// 商品名称
	referencePrice: number;
	// 指导价
}[];
/**
 * @description: 食品安全检测
 */
export type FoodSafetyCheckList = {
	goodsId: number;
	// 商品Id
	goodsName: string;
	// 商品名称
	foodSafetyItemName: string;
	// 检测项目
	foodSafetyHandleItemName: string;
	// 处理方式
	checkQty: string;
	// 检测数量
}[];

/**
 * @description: 交易类别比例
 */
export type BusinessTypeRatioList = {
	name: string;
	// 名称
	value: number;
	// 值
}[];
/**
 * @description: 日交易额统计
 */
export type BusinessCount = {
	xAxisData: string[];
	// 名称
	yAxisData: number[];
	// 值
};
export type State = {
	businessData: BusinessData;
	goodsSellRankingList: GoodsSellRankingList;
	goodsReferencePriceList: GoodsReferencePriceList;
	foodSafetyCheckList: FoodSafetyCheckList;
	businessTypeRatioList: BusinessTypeRatioList;
	businessCount: BusinessCount;
};
