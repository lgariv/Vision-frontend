"use client";

import NavbarSkeleton from "@/components/main-navbar/navigation-bar-skeleton";

export default function Loading() {
	return (
		<>
			<NavbarSkeleton />
			<div className="min-h-[calc(100vh-4rem)] w-full font-heebo" />
		</>
	);
}
