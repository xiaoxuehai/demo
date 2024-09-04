/*
 * @Author: xuehai.xiao xuehai.xiao@meehealth.com
 * @Date: 2024-08-30 20:31:37
 * @LastEditors: xuehai.xiao xuehai.xiao@meehealth.com
 * @LastEditTime: 2024-08-30 20:40:34
 * @FilePath: \demo\script\gen.js
 * @Description:
 */
import fs from 'fs';
import path from 'path';

function main() {
	const files = [
		{
			fileName: '易淹易涝小区',
			fieldNames: {
				name: '小区名称',
				address: '具体地址'
			}
		},
		{
			fileName: '转移安置点',
			fieldNames: {
				name: '详细地址',
				address: '安置点名称'
			}
		},
		{
			fileName: '主干道低洼易涝点',
			fieldNames: {
				name: '所在行政村',
				address: '具体地址'
			}
		},
		{
			fileName: '低洼易涝点',
			fieldNames: {
				name: '所在位置',
				address: '具体地点'
			}
		},
		{
			fileName: '危房',
			fieldNames: {
				name: '村',
				address: '地址'
			}
		},
		{
			fileName: '背街小巷易涝点',
			fieldNames: {
				name: '所在行政村',
				address: '具体地址'
			}
		},
		{
			fileName: '漫水桥',
			fieldNames: {
				name: '所在行政村',
				address: '具体地址'
			}
		},
		{
			fileName: '地质灾害隐患点',
			fieldNames: {
				name: '名称',
				address: '名称'
			}
		},
		{
			fileName: '水库',
			fieldNames: {
				name: '水库名称',
				address: '水库名称'
			}
		}
	];
	const data = [];
	files.forEach(file => {
		const text = fs.readFileSync(
			path.join(process.cwd(), `data/${file.fileName}.txt`)
		);
		const items = text
			.toString()
			.split('\r\n')
			.map(item => item.split('\t'));

		const header = items.shift();
		const result = items.map(item => {
			const data = {
				name: '',
				address: ''
			};
			Object.entries(data).forEach(([key]) => {
				const colName = file.fieldNames[key];
				// if (file.fileName === '主干道低洼易涝点') {
				// 	console.log(colName, file.fieldNames);
				// }
				const index = header.indexOf(colName);
				data[key] = item[index];
			});
			data.details = item.map((value, index) => ({
				label: header[index],
				value
			}));
			data.coord = [];
			return data;
		});
		data.push({
			name: file.fileName,
			children: result
		});
		fs.writeFileSync(
			path.join(process.cwd(), 'data.json'),
			JSON.stringify(data)
		);
	});
}
main();
