import SiteList from "@/components/site-list";
import LastUpdatedFooter from "@/components/last-updated-footer";

// export const dynamic = "force-dynamic";
export const revalidate = 30;

type Props = {};

/**
 * Renders the Dashboard component.
 * @returns The rendered Dashboard component.
 */
export default function Dashboard(props: Props) {
	return (
		<div className="flex min-h-[calc(100vh-4rem)] w-full flex-col font-heebo">
			<main className="flex flex-1 flex-col gap-2 p-2 md:gap-4 md:p-4">
				<div className="grid sm:grid-cols-2 md:grid-cols-auto-fill-220 gap-2 md:gap-3">
					<SiteList />
				</div>
			</main>
			<LastUpdatedFooter />
		</div>
	);
}
