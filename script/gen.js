import fs from 'fs';
import path from 'path';
const CONFIG = {
	"name": "具体地址",
	// "具体地址": "address",
}
const text = fs.readFileSync(path.join(process.cwd(), 'data/低洼易涝点.txt'));
const items = text.toString().split('\r\n').map(item => item.split('\t'))

const header = items.shift()
const result = items.map((item) => {
	const data = {
		name: "",
		address: "",
		detail: []
	}
	item.map((value, index) => {
		const colName = header[index];
		const fields =  Object.entries(CONFIG).filter(([_, value]) => value === colName)
		for (const [key] of fields) {
			data[key] = value
		}
		if (key) {
			data[key] = value;
		} else {
			data.detail.push(`${colName}: ${value}`)
		}
	})
	return data
})
console.log(result);

// fs.writeFileSync(path.join(process.cwd(), 'data1.json'), JSON.stringify(array));
