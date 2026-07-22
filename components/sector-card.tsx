import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


interface SectorCardProps {
	sectorNumber: number;
	sectorState: sectorState;
	cardVariant?: "default" | "modal";
	currentValue: any;
	previousValue: any;
	metricLabel: string;
}

/**
 * Renders a sector card component.
 * @param {SectorCardProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export default function SectorCard({ sectorNumber, sectorState, currentValue, previousValue, cardVariant, metricLabel }: SectorCardProps) {
	const currentNumber = Number(Array.isArray(currentValue) ? currentValue[0] : currentValue);
	const previousNumber = Number(Array.isArray(previousValue) ? previousValue[0] : previousValue);
	const hasCurrentValue = Number.isFinite(currentNumber);
	const hasPreviousValue = Number.isFinite(previousNumber) && previousValue?.toString().length > 0;
	const delta = hasPreviousValue ? currentNumber - previousNumber : 0;
	const deltaPercent = hasPreviousValue && previousNumber !== 0
		? Math.round((delta / Math.abs(previousNumber)) * 100)
		: null;
	const TrendIcon = delta > 0 ? TrendingUp : TrendingDown;

	return (
		<Card
			className={
				sectorState === "disabled"
					? "flex flex-col relative border-[1.5px] shadow-lg shadow-red-400/40 dark:shadow-none border-red-500/40 dark:border-red-700/40 bg-red-500/40"
					: `flex flex-col relative border-[1.5px] shadow-lg bg-card dark:bg-secondary/50`
			}
		>
			<CardHeader className="flex flex-row items-center justify-between my-[2px] mx-[4px] p-1 pb-0">
				<CardTitle className="font-light text-xs text-muted-foreground">
					סקטור {sectorNumber}
				</CardTitle>
			</CardHeader>
			<CardContent className="font-semibold my-[2px] mx-[4px] p-1 -mt-2">
				<div className="flex items-center justify-end">
					<p className="text-md font-bold tabular-nums">
						{sectorState === "enabled"
							? hasCurrentValue ? currentNumber : "—"
							: sectorState === "locked"
							? "נעול"
							: "למטה"}
					</p>
				</div>
				<div className="mt-1 flex h-5 items-center justify-center">
					{hasPreviousValue && delta !== 0 && sectorState === "enabled" && (
						<span
							data-trend={delta > 0 ? "up" : "down"}
							title={`קודם: ${previousNumber} ${metricLabel}${deltaPercent === null ? "" : ` · שינוי של ${deltaPercent}%`}`}
							aria-label={`שינוי מהמדידה הקודמת: ${delta > 0 ? "+" : ""}${delta}${metricLabel}${deltaPercent === null ? "" : `, ${deltaPercent}%`}`}
							className="inline-flex h-5 w-full items-center justify-center gap-1 rounded-md border border-sky-400/30 bg-sky-500/15 px-1.5 text-xs font-bold text-sky-700 dark:text-sky-200"
						>
							<TrendIcon size={13} strokeWidth={2.5} aria-hidden="true" />
							<span className="tabular-nums">{delta > 0 ? "+" : ""}{delta}</span>
						</span>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
