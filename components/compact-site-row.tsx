import { BadgeAlert, BadgeCheck, BadgeHelp, BadgeMinus } from "lucide-react";
import { usePreferencesStore } from "@/stores/preferences-store";
import { cn } from "@/lib/utils";

type CompactSiteRowProps = {
	site: SiteData;
	onClick: () => void;
};

const STATUS_DETAILS = {
	on: { label: "פעיל", icon: BadgeCheck, className: "text-emerald-500" },
	alert: { label: "התראה", icon: BadgeAlert, className: "text-amber-500" },
	admin: { label: "מנהלי", icon: BadgeHelp, className: "text-violet-500" },
	off: { label: "לא זמין", icon: BadgeMinus, className: "text-rose-500" },
} as const;

export default function CompactSiteRow({ site, onClick }: CompactSiteRowProps) {
	const { primaryValue } = usePreferencesStore();
	const mode = site.success ? (site.status as keyof typeof STATUS_DETAILS) : "off";
	const status = STATUS_DETAILS[mode] ?? STATUS_DETAILS.off;
	const StatusIcon = status.icon;
	const currentData = site.data?.find((item) => item.index === "current");
	const sectorCount = currentData?.st_cell?.data?.length ?? 0;

	const metric = (() => {
		if (!site.success || !currentData) return "אין נתוני ניטור";

		if (primaryValue === "RR") {
			const values = (currentData.rr?.data ?? [])
				.map((item) => Number(item.value))
				.filter(Number.isFinite);
			const average = values.length
				? values.reduce((sum, value) => sum + value, 0) / values.length
				: 0;
			return `ממוצע ${average.toFixed(1)} dBm`;
		}

		const totalUes = (currentData.ue_print_admitted?.data ?? [])
			.slice(0, sectorCount)
			.map((item) => Number(item["ue's"]))
			.filter(Number.isFinite)
			.reduce((sum, value) => sum + value, 0);
		return `${totalUes} UEs`;
	})();

	return (
		<button
			type="button"
			disabled={!site.success}
			onClick={onClick}
			className={cn(
				"col-span-full grid w-full grid-cols-[1fr_auto] items-center gap-4 rounded-xl border bg-secondary/70 px-4 py-3 text-right shadow-sm transition-colors sm:col-span-2 md:col-span-2 dark:bg-card",
				site.success && "cursor-pointer hover:border-primary/50 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				!site.success && "cursor-default opacity-80"
			)}
			dir="rtl"
		>
			<div className="flex min-w-0 items-center gap-3">
				<StatusIcon className={status.className} size={24} aria-hidden="true" />
				<div className="min-w-0">
					<p className="truncate text-lg font-bold">{site.displayName}</p>
					<p className="text-sm text-muted-foreground">{site.area} · {status.label}</p>
				</div>
			</div>
			<div className="text-left">
				<p className="font-semibold tabular-nums">{metric}</p>
				{site.success && <p className="text-xs text-muted-foreground">{sectorCount} סקטורים</p>}
			</div>
		</button>
	);
}
