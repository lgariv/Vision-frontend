"use client";

import Loading from "@/components/site-list-skeleton";
import SiteCard from "@/components/site-card";
import { useSitesStore } from "@/stores/sites-store";
import { useEffect, useState } from "react";
import { useSites } from "@/utils/use-sites";
import { Button, Modal, useDisclosure } from "@nextui-org/react";
import Content from "./map/modal-data/content";
import { SearchX } from "lucide-react";
import { usePreferencesStore } from "@/stores/preferences-store";
import CompactSiteRow from "./compact-site-row";

/**
 * Renders a list of sites using data fetched from the "/api/sites-data" endpoint.
 * The list is sorted based on the "success" property of each site in descending order.
 * Each site is rendered as a SiteCard component.
 * If the data is still loading, a Loading component is rendered instead.
 * @returns The rendered list of sites as SiteCard components.
 */
export default function SiteList() {
	const { sitesData, setSitesData, searchString, filterString, setSearchString, setFilterString } = useSitesStore();
	const { data: sites, isLoading } = useSites();
	const { dashboardView } = usePreferencesStore();

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [modalDataToDisplay, setModalDataToDisplay] = useState({});
	const [siteDataMapIndex, setSiteDataMapIndex] = useState(0)

	useEffect(() => {
		if (sites) {
			const filteredSites = sites.filter((site: any) => {
				const lowerCaseSearchString = searchString?.toLowerCase() ?? "";
				const lowerCaseDisplayName = site.displayName.toLowerCase();
				const lowerCaseAmosName = site.amosName.toLowerCase();
				return (
					lowerCaseDisplayName.includes(lowerCaseSearchString) ||
					lowerCaseAmosName.includes(lowerCaseSearchString)
				);
			});

			if (filterString && filterString !== "הכל" && filterString !== "כלים ניידים") {
				const filteredSitesByArea = filteredSites.filter((site: any) => {
					return site.area.includes(filterString);
				});
				setSitesData(filteredSitesByArea);
			} else if (filterString === "כלים ניידים") {
				const filteredSitesByType = filteredSites.filter((site: any) => site.isPortable);
				setSitesData(filteredSitesByType);
			} else {
				setSitesData(filteredSites);
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sites, searchString, filterString]);

	const handleNext = () => {
		let sortedSitesData = sitesData!
			.sort((a: any, b: any) => {
				return a.amosName.localeCompare(b.amosName);
			})
			.sort((a: any, b: any) => {
				return b.success - a.success;
			})
			.filter((a) => {
				return a.success;
			});
		setSiteDataMapIndex((prevIndex) => prevIndex < sortedSitesData.length-1 ? prevIndex + 1 : 0)
		setModalDataToDisplay(sortedSitesData[siteDataMapIndex < sortedSitesData.length-1 ? siteDataMapIndex + 1 : 0]);
	}

	const handlePrev = () => {
		let sortedSitesData = sitesData!
			.sort((a: any, b: any) => {
				return a.amosName.localeCompare(b.amosName);
			})
			.sort((a: any, b: any) => {
				return b.success - a.success;
			})
			.filter((a) => {
				return a.success;
			});
		setSiteDataMapIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : sortedSitesData.length-1)
		setModalDataToDisplay(sortedSitesData[siteDataMapIndex > 0 ? siteDataMapIndex - 1 : sortedSitesData.length-1]);
	}

	return (
		<>
			<Modal
				backdrop="blur"
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				scrollBehavior="inside"
				className="w-full md:w-1/3 md:max-w-screen-2xl"
			>
				<Content
					data={modalDataToDisplay}
					inDashboard={true}
					handleNext={handleNext}
					handlePrev={handlePrev}
				/>
			</Modal>
			{sitesData && sitesData.length === 0 ? (
				<div
					className="col-span-full flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed bg-secondary/50 px-6 py-10 text-center"
					dir="rtl"
					role="status"
				>
					<div className="mb-4 rounded-full bg-muted p-4 text-muted-foreground">
						<SearchX size={34} aria-hidden="true" />
					</div>
					<h2 className="text-2xl font-bold">לא נמצאו אתרים</h2>
					<p className="mt-2 max-w-md text-muted-foreground">
						לא נמצאו תוצאות שמתאימות לחיפוש או לסינון שבחרת.
					</p>
					<Button
						className="mt-5 font-heebo font-semibold"
						color="primary"
						onPress={() => {
							setSearchString("");
							setFilterString("הכל");
						}}
					>
						ניקוי חיפוש וסינון
					</Button>
				</div>
			) : sitesData ? (
				sitesData
					.sort((a: any, b: any) => {
						return a.amosName.localeCompare(b.amosName);
					})
					.sort((a: any, b: any) => {
						return b.success - a.success;
					})
					.map((site: SiteData, index: number) => {
						const openSite = () => {
								setSiteDataMapIndex(index);
								setModalDataToDisplay(site);
								onOpen();
						};

						return dashboardView === "compact" ? (
							<CompactSiteRow key={site.amosName} site={site} onClick={openSite} />
						) : (
							<SiteCard key={site.amosName} onClick={openSite} siteName={site.displayName} site={site} />
						);
					})
			) : (
				<Loading />
			)}
		</>
	);
}
