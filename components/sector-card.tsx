import { ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


interface SectorCardProps {
	sectorNumber: number;
	sectorState: sectorState;
	cardVariant?: "default" | "modal";
	currentValue: any;
	previousValue: any;
}

/**
 * Renders a sector card component.
 * @param {SectorCardProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export default function SectorCard({ sectorNumber, sectorState, currentValue, previousValue, cardVariant }: SectorCardProps) {
	let deltaDirection;
	switch (true) {
		case previousValue === undefined || previousValue.toString().length === 0:
			deltaDirection = "none";
			break;
		case currentValue - previousValue > 0:
			deltaDirection = "positive";
			break;
		case currentValue - previousValue < 0:
			deltaDirection = "negative";
			break;
		default:
			deltaDirection = "neutral";
			break;
	}
	const deltaValue = Math.abs(currentValue - previousValue);

	return (
		<Card
			className={
				sectorState === "disabled"
					? "flex flex-col relative border-[1.5px] shadow-lg shadow-red-400/40 dark:shadow-none border-red-500/40 dark:border-red-700ֿ/40 bg-red-500/40"
					: `flex flex-col relative border-[1.5px] shadow-lg bg-card dark:bg-secondary/50`
			}
		>
			<CardHeader className="flex flex-row items-center justify-between my-[2px] mx-[4px] p-1 pb-0">
				<CardTitle className="font-light text-xs text-muted-foreground">
					סקטור {sectorNumber}
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-row font-semibold items-center justify-between my-[2px] mx-[4px] p-1 -mt-2">
				<div>
					<p className="text-md">
						{sectorState === "enabled"
							? currentValue!
							: sectorState === "locked"
							? "נעול"
							: "למטה"}
					</p>
				</div>
				{deltaDirection !== "none" && (
					<div
						className={`inline-flex self-end ${
							deltaDirection === "positive"
								? "text-green-400 dark:text-green-600"
								: deltaDirection === "negative"
								? "text-red-400 dark:text-red-600"
								: "text-neutral-400 dark:text-neutral-600"
						}`}
					>
						{deltaDirection === "negative" ? (
							<ArrowDown
								className="py-1 -mt-[1px] -me-1"
								size={24}
								strokeWidth={3}
							/>
						) : (
							<ArrowUp
								className="py-1 -mt-[1px] -me-1"
								size={24}
								strokeWidth={3}
							/>
						)}
						<p className="text-md">{deltaValue}</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
 