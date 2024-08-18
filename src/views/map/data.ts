export const categories = [
	{ title: '危房', children: ['吉阳区龙坡村'] },
	{ title: '主干道低洼易涝点', children: ['吉阳区和平实验学校'] },
	{ title: '各村社区低洼易安置点', children: ['吉阳区交通大厦'] },
	{ title: '地质灾害隐患点', children: ['吉阳区山营村'] },
	{ title: '水库山塘（河道）', children: ['吉阳区半岭水库'] },
	{
		title: '景区景点',

		children: ['吉阳区吉阳湿地公园', '吉阳区八仙庙', '吉阳区凤凰岭海誓山盟景区']
	},
	{ title: '易受淹小区', children: ['吉阳区未名湖'] },
	{ title: '漫水路桥', children: ['吉阳区封塘大桥'] },
	{ title: '物资仓库点位', children: ['吉阳区新红村'] }
].map(item => ({ ...item, count: item.children.length }));
