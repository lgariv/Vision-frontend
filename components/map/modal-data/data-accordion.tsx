import React, { useCallback } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import StMmeData from "./stMme-data";
import AltData from "./alt-data";
import StIkeData from "./stIke-data";
import InvxrfData from "./invxrf-data";
import RRData from "./rr-data";
import { BadgeAlert, BadgeCheck, BadgeHelp, BadgeMinus } from "lucide-react";

type Props = {
	data: SiteData;
};

/**
 * Renders the accordion data component.
 *
 * @param {Props} props - The component props.
 * @param {object} props.data - The data object.
 * @returns {JSX.Element} The rendered component.
 */
export default function AccordionData({ data }: Props) {
	const GetBadge = useCallback(function GetBadge(status: string) {
		if (status === "on") return <BadgeCheck className="text-green-400 dark:text-green-600" size={32} />;
		else if (status === "alert") return <BadgeAlert className="text-amber-400 dark:text-amber-600" size={32} />;
		else if (status === "admin") return <BadgeHelp className="text-violet-400 dark:text-violet-600" size={32} />;
		else return <BadgeMinus className="text-muted-foreground" size={32} />
	}, []);	

    const itemClasses = {
        base: "w-full font-heebo",
        title: "font-normal text-medium",
        trigger: "px-2 py-0 transition transform duration-300 data-[hover=true]:bg-card dark:data-[hover=true]:dark:bg-secondary/50 rounded-lg h-14 flex items-center",
        indicator: "text-medium",
        content: "text-small px-2",
    };

	const currentData = data.data?.find((item: any) => item.index === "current")?.gpsData?.data?.[0];
	
    if (currentData)
		return (
			<Accordion
				showDivider={false}
				className="flex flex-col w-full font-heebo"
				itemClasses={itemClasses}
			>
				<AccordionItem
					startContent={GetBadge(
						data.data[0].st_mme.generalInfo.status
					)}
					key="1"
					aria-label="st mme"
					subtitle={<span>עורקים ל-MME</span>}
					title={<strong>st mme</strong>}
				>
					<StMmeData data={data.data[0]["st_mme"]} />
				</AccordionItem>
				<AccordionItem
					startContent={GetBadge(
						data.data[0].st_ike.generalInfo.status
					)}
					key="2"
					aria-label="st ike"
					subtitle={<span>עורקי תקשורת</span>}
					title={<strong>st ike</strong>}
				>
					<StIkeData data={data.data[0]["st_ike"]} />
				</AccordionItem>
				<AccordionItem
					startContent={GetBadge(
						data.data[0].invxrf.generalInfo.status
					)}
					key="3"
					aria-label="invxrf"
					subtitle={<span>יחס גלים חוזרים</span>}
					title={<strong>invxrf</strong>}
				>
					<InvxrfData data={data.data[0]["invxrf"]} />
				</AccordionItem>
				<AccordionItem
					startContent={GetBadge(data.data[0].alt.generalInfo.status)}
					key="4"
					aria-label="alt"
					subtitle={<span>התראות פעילות</span>}
					title={<strong>alt</strong>}
				>
					<AltData data={data.data[0]["alt"]} />
				</AccordionItem>
				<AccordionItem
					startContent={GetBadge(data.data[0].rr.generalInfo.status)}
					className="pb-5"
					key="5"
					aria-label="rr"
					subtitle={<span>רצפת רעש</span>}
					title={<strong>rr</strong>}
				>
					<RRData data={data.data[0]["rr"]} />
				</AccordionItem>
			</Accordion>
		);
}
