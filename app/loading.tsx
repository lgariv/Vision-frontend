import NavbarSkeleton from "@/components/main-navbar/navigation-bar-skeleton";
import SiteListSkeleton from "@/components/site-list-skeleton";
import LastUpdatedFooter from "@/components/last-updated-footer";

export default function Loading() {
	return (
		<>
			<NavbarSkeleton />
			<div className="flex min-h-[calc(100vh-4rem)] w-full flex-col font-heebo">
				<main className="flex flex-1 flex-col gap-2 p-2 md:gap-4 md:p-4">
					<div className="grid sm:grid-cols-2 md:grid-cols-auto-fill-220 gap-2 md:gap-3">
						<SiteListSkeleton />
					</div>
				</main>
				<LastUpdatedFooter />
			</div>
		</>
	);
}
