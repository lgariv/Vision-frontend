import { useEffect, useState, useRef } from "react";

import { useSites } from "@/utils/use-sites";
import { useSitesStore } from "@/stores/sites-store";

import {
    Marker,
    Tooltip,
    useMap,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";

import { generateMapIcon } from "./icons";
import { useTheme } from "next-themes";

import {
    Modal,
    useDisclosure,
} from "@nextui-org/react";

import Content from "./modal-data/content";

type Props = {};

/**
 * Renders a map data layer component.
 *
 * @component
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
const MapDataLayer = (props: Props) => {
    const animateRef = useRef(false);
    const map = useMap();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { sitesData, setSitesData, searchString, filterString } = useSitesStore();
    const { data: sites } = useSites();
    const { resolvedTheme } = useTheme();
    
    const [modalDataToDisplay, setModalDataToDisplay] = useState({});
    
    useEffect(() => {
        if (sites) {
            const filteredSites = sites.filter((site: SiteData) => {
                const lowerCaseSearchString = searchString?.toLowerCase() ?? "";
                const lowerCaseDisplayName = site.displayName.toLowerCase();
                const lowerCaseAmosName = site.amosName.toLowerCase();
                return (
                    lowerCaseDisplayName.includes(lowerCaseSearchString) ||
                    lowerCaseAmosName.includes(lowerCaseSearchString)
                );
            });
            
            if (
                filterString &&
                filterString !== "הכל" &&
                filterString !== "כלים ניידים"
            ) {
                const filteredSitesByArea = filteredSites.filter((site: any) => {
                    return site.area.includes(filterString);
                });
                setSitesData(filteredSitesByArea);
            } else if (filterString === "כלים ניידים") {
                const filteredSitesByType = filteredSites.filter(
                    (site: any) => site.isPortable
                );
                setSitesData(filteredSitesByType);
            } else {
                setSitesData(filteredSites);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sites, searchString, filterString]);
    
    return (
        <>
            <Modal
                backdrop="blur"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior="inside"
                className="w-1/3 max-w-screen-2xl"
            >
                <Content data={modalDataToDisplay} />
            </Modal>
            {/* only sites that have data object contain gps location */}
            {sitesData
                ?.filter((site: any) => typeof site.data === "object")
                .map((siteData: any, index: number) => {
                    const currentData = siteData.data?.find((item: any) => item.index === "current")?.gpsData?.data?.[0];
                    const hasValidLocation = currentData?.latitude && !currentData.latitude.includes("0.") && currentData?.longitude; // TODO: similarly, add filter between 2 longlat points to filter out GPS discrepancies

                    const pinLocation: LatLngExpression = hasValidLocation
                        ? [currentData.latitude, currentData.longitude]
                        : siteData.defaultLocation.split(",").map(Number);

                    const displayName: string = siteData.displayName;
                    const isPortable: boolean = siteData.isPortable;
                    const status: string = siteData.status;
                    
                    // if (!isPortable) { // TODO: Add different icon for portable sites
                        return (
                            <div key={siteData.displayName}>
                                <Marker
                                    key={siteData.displayName}
                                    position={pinLocation}
                                    icon={
                                        resolvedTheme === "light"
                                        ? generateMapIcon("notPortable", status === "admin" ? "violet" : status === "on" ? "green" : status === "alert" ? "gold" : "red", "light")
                                        : generateMapIcon("notPortable", status === "admin" ? "violet" : status === "on" ? "green" : status === "alert" ? "gold" : "red", "dark")
                                    }
                                    eventHandlers={{
                                        click: (e) => {
                                            setModalDataToDisplay(siteData);
                                            onOpen();
                                        },
                                    }}
                                >
                                    <Tooltip sticky className="dark:text-white dark:bg-card">{displayName}</Tooltip>
                                </Marker>
                            </div>
                        );
                    // }
                })
            }
        </>
    );
};
    
export default MapDataLayer;