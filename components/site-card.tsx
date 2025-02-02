import {
	BadgeAlert,
	BadgeCheck,
	BadgeHelp,
	BadgeMinus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import SectorCard from "@/components/sector-card";
import { usePreferencesStore } from "@/stores/preferences-store";
import { CircularProgress } from "@nextui-org/react";

interface SiteCardProps {
	siteName: string;
	site: SiteData;
	variant?: "default" | "modal";
	onClick?: any;
}

/**
 * Renders a card component for a site.
 * @param {Object} props - The component props.
 * @param {string} props.siteName - The name of the site.
 * @param {Object} props.site - The site object.
 * @returns {JSX.Element} The rendered card component.
 */
export default function SiteCard({ siteName, site, variant, onClick }: SiteCardProps) {
	const { primaryValue } = usePreferencesStore();

	var cardVariant = variant || "default";

	var mode;
	switch (site.success == true) {
		case true:
			mode = site.status ?? "on";
			break;
		case false:
			mode = "off";
			break;
	}

	return (
		<Card
			onClick={mode !== "off" ? onClick : ()=>{}}
			className={
				cardVariant === "default"
					? `flex flex-col ${mode !== "off" ? "cursor-pointer": ""} relative border-2 select-none bg-secondary dark:bg-transparent`
					: "bg-transparent select-none ring-0 border-0 shadow-none"
			}
		>
			{cardVariant === "default" && (
				<CardHeader className="flex flex-row justify-between py-2 px-4">
					<CardTitle className="font-medium text-2xl mt-1">
						{siteName}
					</CardTitle>
					{(() => {
						switch (mode) {
							case "on":
								return (
									<BadgeCheck className="text-green-400 dark:text-green-600" />
								);
							case "off":
								return (
									<BadgeMinus className="text-red-400 dark:text-red-600" />
								);
							case "alert":
								return (
									<BadgeAlert className="text-amber-400 dark:text-amber-600" />
								);
							case "admin":
								return (
									<BadgeHelp className="text-violet-400 dark:text-violet-600" />
								);
							default:
								return null;
						}
					})()}
				</CardHeader>
			)}
			{process.env.NODE_ENV === "development" &&
				`${site.data[0]?.date.split("T")[0]}, ${
					site.data[0]?.date.split("T")[1].split(".")[0]
				}`}
			{(mode === "on" || mode === "alert" || mode === "admin") && (
				<CardContent
					className={
						cardVariant === "default"
							? primaryValue === "UEs"
								? "grid grid-cols-2 p-2 gap-2"
								: "grid grid-cols-3 p-2 gap-2"
							: "grid grid-cols-2 lg:grid-cols-3 p-2 gap-2"
					}
				>
					{Array.from(
						site.data[0]?.st_cell?.data ?? [],
						(cell: any, i: number) => {
							const currentRRValue = Number(
								site!.data
									.find(
										(item: any) => item.index == "current"
									)
									?.rr?.data.map(
										(item: any, index: number) => {
											if (item.sector == cell.sector)
												return item["value"];
										}
									)
									.filter(
										(item: string) => item !== undefined
									)
							);

							const currentUEValue = site!.data
								.find((item: any) => item.index == "current")
								?.ue_print_admitted?.data.map(
									(item: any, index: number) => {
										if (item.sectorId == cell.sectorId)
											return item["ue's"];
									}
								)
								.filter((item: string) => item !== undefined);
							const previousUEValue = site!.data
								.find((item: any) => item.index == "previous")
								?.ue_print_admitted?.data.map(
									(item: any, index: number) => {
										if (item.sectorId == cell.sectorId)
											return item["ue's"];
									}
								)
								.filter((item: string) => item !== undefined);

							return primaryValue === "UEs" ||
								cardVariant === "modal" ? (
								<SectorCard
									sectorNumber={cell.sector}
									key={cell.sector}
									cardVariant={cardVariant}
									sectorState={
										cell.opState.includes("1")
											? "enabled"
											: cell.admState.includes("1")
											? "disabled"
											: "locked"
									}
									currentValue={currentUEValue}
									previousValue={previousUEValue}
								/>
							) : (
								<Card
									className={`flex flex-col items-center border-[1.5px] py-1 shadow-lg bg-card dark:bg-secondary/50 ${
										cell.admState.includes("1") &&
										cell.opState.includes("0")
											? "flex flex-col relative border-2 shadow-lg shadow-red-400/40 dark:shadow-none border-red-500/40 dark:border-red-700ֿ/40" // disabled
											: ""
									}`}
								>
									<CircularProgress
										className="justify-self-center text-center"
										key={cell.sector}
										size="lg"
										value={Math.abs(currentRRValue)} // Calculate the absolute value
										color={
											// TODO: make it dynamic
											Math.abs(currentRRValue) <= 110
												? Math.abs(currentRRValue) <=
												  100
													? "danger"
													: "warning"
												: "success"
										}
										maxValue={125}
										minValue={80}
										formatOptions={{}}
										label={`סקטור ${cell.sector}`}
										showValueLabel={true}
										valueLabel={
											cell.opState.includes("1") ? (
												Math.abs(currentRRValue) !=
												0 ? (
													Math.abs(currentRRValue)
												) : (
													<></>
												)
											) : cell.admState.includes("1") ? (
												"למטה"
											) : (
												"נעול"
											)
										}
										isDisabled={cell.opState.includes("0")}
									/>
								</Card>
							);
						}
					)}
				</CardContent>
			)}
		</Card>
	);
}
