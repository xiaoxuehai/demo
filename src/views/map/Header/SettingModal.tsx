import {
	Form,
	Message,
	Modal,
	ModalProps,
	Select,
	Slider
} from '@arco-design/web-react';
import { useEffect } from 'react';
// import ReactPlayer from 'react-player';

export type SettingModalProps = ModalProps & {
	onSuccess: (values: Recordable) => void;
};
export const CACHE_KEY = 'MAP_SETTING';
export function SettingModal({ onSuccess, ...rest }: SettingModalProps) {
	const [form] = Form.useForm();
	useEffect(() => {
		if (!rest.visible) return;
		const mapSetting = localStorage.getItem(CACHE_KEY);

		if (!mapSetting) return;
		const { fontSize, mapStyle } = JSON.parse(mapSetting);
		form.setFieldsValue({ fontSize, mapStyle });
	}, [rest.visible]);
	const styles = [
		{
			label: '标准',
			value: 'normal'
		},
		{
			label: '幻影黑',
			value: 'dark',
			dark: true
		},
		{
			label: '月光银',
			value: 'light'
		},
		{
			label: '远山黛',
			value: 'whitesmoke'
		},
		{
			label: '草色青',
			value: 'fresh'
		},
		{
			label: '雅士灰',
			value: 'grey',
			dark: true
		},
		{
			label: '涂鸦',
			value: 'graffiti',
			dark: true
		},
		{
			label: '马卡龙',
			value: 'macaron'
		},
		{
			label: '靛青蓝',
			value: 'blue',
			dark: true
		},
		{
			label: '极夜蓝',
			value: 'darkblue',
			dark: true
		},
		{
			label: '酱籽',
			value: 'wine',
			dark: true
		}
	];
	function generateFontSize(start, end, interval) {
		const result = [];
		for (let i = start; i <= end; i += interval) {
			result.push(i);
		}
		return Object.fromEntries(result.map(value => [value, `${value}px`]));
	}

	return (
		<Modal
			className='w-[900px]'
			title='设置'
			{...rest}
			onConfirm={() => {
				const values = form.getFieldsValue();
				localStorage.setItem(CACHE_KEY, JSON.stringify(values));
				rest.onCancel?.();
				Message.success('设置成功');
				onSuccess({
					...values,
					mapDark: !!styles.find(style => style.value === values.mapStyle)?.dark
				});
			}}
		>
			<Form form={form} labelCol={{ span: 4 }}>
				<Form.Item label='字体大小' field='fontSize' initialValue={14}>
					<Slider
						max={40}
						min={12}
						showTicks
						step={2}
						marks={generateFontSize(12, 40, 2)}
					/>
				</Form.Item>
				<Form.Item label='地图样式' field='mapStyle' initialValue='darkblue'>
					<Select>
						{styles.map(style => (
							<Select.Option key={style.value} value={style.value}>
								{style.label}({style.value})
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	);
}
