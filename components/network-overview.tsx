"use client";

import { Activity, RadioTower, TriangleAlert, WifiOff } from "lucide-react";
import { useSitesStore } from "@/stores/sites-store";
import { Skeleton } from "@/components/ui/skeleton";

const NetworkOverview = () => {
	const { sitesData } = useSitesStore();

	if (!sitesData) {
		return (
			<section
				className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3"
				dir="rtl"
				aria-label="טוען סקירת מצב הרשת"
				aria-busy="true"
			>
				{Array.from({ length: 4 }).map((_, index) => (
					<div
						key={index}
						className="flex items-center justify-between rounded-xl border bg-secondary/70 px-4 py-3 shadow-sm dark:bg-card"
					>
						<div className="space-y-2">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-9 w-12" />
						</div>
						<Skeleton className="h-11 w-11 rounded-xl" />
					</div>
				))}
			</section>
		);
	}

	const sites = sitesData ?? [];

	const stats = [
		{
			label: "סה״כ אתרים",
			value: sites.length,
			icon: RadioTower,
			className: "text-sky-500 bg-sky-500/10",
		},
		{
			label: "פעילים",
			value: sites.filter((site) => site.status === "on").length,
			icon: Activity,
			className: "text-emerald-500 bg-emerald-500/10",
		},
		{
			label: "עם התראות",
			value: sites.filter((site) => site.status === "alert" || site.status === "admin").length,
			icon: TriangleAlert,
			className: "text-amber-500 bg-amber-500/10",
		},
		{
			label: "לא זמינים",
			value: sites.filter((site) => !site.success || site.status === "off").length,
			icon: WifiOff,
			className: "text-rose-500 bg-rose-500/10",
		},
	];

	return (
		<section className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3" dir="rtl" aria-label="סקירת מצב הרשת">
			{stats.map(({ label, value, icon: Icon, className }) => (
				<div key={label} className="flex items-center justify-between rounded-xl border bg-secondary/70 px-4 py-3 shadow-sm dark:bg-card">
					<div>
						<p className="text-sm text-muted-foreground">{label}</p>
						<p className="text-3xl font-bold tabular-nums">{value}</p>
					</div>
					<div className={`rounded-xl p-2.5 ${className}`}>
						<Icon size={24} aria-hidden="true" />
					</div>
				</div>
			))}
		</section>
	);
};

export default NetworkOverview;
