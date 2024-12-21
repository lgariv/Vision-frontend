"use client";
import {
    MapContainer,
    TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { LatLngExpression} from "leaflet";
import MapDataLayer from "./map-data";
import { useTheme } from "next-themes";

const center: LatLngExpression = [32.089456319281176, 34.893238387602985];


export default function MyMap(props: any) {
    const {resolvedTheme} = useTheme();

	const SERVER_MAP = resolvedTheme === "light" 
		? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
		: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png";
    
    return (
		<>
			{resolvedTheme === "light" && (
				<MapContainer
					attributionControl={false}
					zoomControl={false}
					center={center}
					zoom={8}
					scrollWheelZoom={true}
					style={{
						height: "calc(100%)",
						width: "100%",
						zIndex: "0",
						backgroundColor: "white",
					}}
				>
					<TileLayer
						attribution="Lavie Gariv © 2024"
						url={`${SERVER_MAP}`}
					/>
					<MapDataLayer />
				</MapContainer>
			)}
			{resolvedTheme === "dark" && (
				<MapContainer
					attributionControl={false}
					zoomControl={false}
					center={center}
					zoom={8}
					scrollWheelZoom={true}
					style={{
						height: "calc(100%)",
						width: "100%",
						zIndex: "0",
						backgroundColor: "black",
					}}
				>
					<TileLayer
						attribution="Lavie Gariv © 2024"
						url={`${SERVER_MAP}`}
					/>
					<MapDataLayer />
				</MapContainer>
			)}
		</>
	);
}
