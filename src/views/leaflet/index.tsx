// import { useEffect, useRef } from 'react';

// import L from 'leaflet'; // 引入Leaflet库
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Leaflet() {
	const center: [number, number] = [30.505342, 114.373252];
	return (
		<MapContainer
			center={center}
			zoom={16}
			style={{ height: '100vh', width: '100vw' }}
		>
			<TileLayer
				url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			<Marker position={center}>
				<Popup>吉阳区，三亚</Popup>
			</Marker>
		</MapContainer>
	);
}
