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
			value: 'dark'
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
			value: 'grey'
		},
		{
			label: '涂鸦',
			value: 'graffiti'
		},
		{
			label: '马卡龙',
			value: 'macaron'
		},
		{
			label: '靛青蓝',
			value: 'blue'
		},
		{
			label: '极夜蓝',
			value: 'darkblue'
		},
		{
			label: '酱籽',
			value: 'wine'
		}
	];
	return (
		<Modal
			className='w-[600px]'
			title='设置'
			{...rest}
			onConfirm={() => {
				const values = form.getFieldsValue();
				localStorage.setItem(CACHE_KEY, JSON.stringify(values));
				rest.onCancel?.();
				Message.success('设置成功');
				onSuccess(values);
			}}
		>
			<Form form={form} labelCol={{ span: 4 }}>
				<Form.Item label='字体大小' field='fontSize' initialValue={14}>
					<Slider
						max={20}
						min={12}
						showTicks
						marks={{
							12: '12px',
							13: '13px',
							14: '14px',
							15: '15px',
							16: '16px',
							17: '17px',
							18: '18px',
							19: '19px',
							20: '20px'
						}}
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
