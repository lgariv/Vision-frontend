"use client";

import { LayoutGrid, Rows3 } from "lucide-react";

import { cn } from "@/lib/utils";
import { usePreferencesStore } from "@/stores/preferences-store";

type DashboardViewToggleProps = {
	showMetric?: boolean;
};

export function DashboardViewToggle({ showMetric = false }: DashboardViewToggleProps) {
	const { dashboardView, setDashboardView, primaryValue } = usePreferencesStore();

	return (
		<div className="flex items-center gap-2" dir="rtl">
			<div className="inline-flex rounded-lg border bg-secondary/70 p-1 dark:bg-card" aria-label="תצוגת לוח מחוונים">
				<button
					type="button"
					aria-pressed={dashboardView === "cards"}
					onClick={() => setDashboardView("cards")}
					className={cn("inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors", dashboardView === "cards" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground")}
				>
					<LayoutGrid size={15} aria-hidden="true" />
					כרטיסים
				</button>
				<button
					type="button"
					aria-pressed={dashboardView === "compact"}
					onClick={() => setDashboardView("compact")}
					className={cn("inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors", dashboardView === "compact" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground")}
				>
					<Rows3 size={15} aria-hidden="true" />
					קומפקטי
				</button>
			</div>
			{showMetric && (
				<span className="rounded-md border px-2 py-1 text-[11px] font-bold text-muted-foreground">
					{primaryValue === "RR" ? "dBm" : "UEs"}
				</span>
			)}
		</div>
	);
}
