"use client";

import NavbarSkeleton from "@/components/main-navbar/navigation-bar-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Loading() {
	return (
		<>
			<NavbarSkeleton />
			<div className="min-h-[calc(100vh-4rem)] w-full font-heebo">
				<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-2 p-4">
					<div className="md:w-[800px] w-[400px] self-center">
						<div className="grid grid-cols-3 w-[500px] mx-auto mb-4 rounded-lg bg-muted p-1">
							<Skeleton className="h-8 w-full rounded-md" />
							<Skeleton className="h-8 w-full rounded-md" />
							<Skeleton className="h-8 w-full rounded-md" />
						</div>
						<Card className="shadow-lg light:shadow-accent">
							<div className="p-4 pb-2" dir="rtl">
								<Skeleton className="h-7 w-32 mb-2" />
								<Skeleton className="h-5 w-full" />
							</div>
							<div className="p-4" dir="rtl">
								<Skeleton className="h-10 w-[240px] bg-accent" />
							</div>
							<div className="p-4 flex justify-end">
								<Skeleton className="h-9 w-[120px]" />
							</div>
						</Card>
					</div>
				</main>
			</div>
		</>
	);
}
