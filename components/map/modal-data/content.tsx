import {
    ModalContent,
    ModalHeader,
    ModalBody,
	ScrollShadow,
	Input,
	Button,
	ModalFooter,
} from "@nextui-org/react";
import DataAccordion from "./data-accordion";
import SiteCard from "@/components/site-card";
import { Edit3Icon, MapPin, SaveIcon, SkipBackIcon, SkipForwardIcon, WifiOff } from "lucide-react";
import { usePreferencesStore } from "@/stores/preferences-store";
import { useEffect, useState } from "react";
import { mutate } from "swr";

type Props = {
	data: any;
	inDashboard?: boolean;
	handleNext?: any;
	handlePrev?: any;
};

const Content = ({ data, inDashboard, handleNext, handlePrev }: Props) => {
	const displayName = data.displayName;
	const hasMonitoringData = data?.success && Array.isArray(data?.data) && data.data.length > 0;

	const { location, setLocation } = usePreferencesStore();
	const [tempLocation, setTempLocation] = useState("");
	const [locationPending, setLocationPending] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		mutate("/api/sites-data");
		setLocationPending(false);
	}, [location]);

	return (
		<ModalContent className="bg-secondary dark:bg-card w-fill max-w-[1000px]">
			<ModalHeader className="flex flex-col gap-2 font-heebo">
				<div className="flex flex-col space-y-1.5 pt-2" dir="rtl">
					<div className="text-5xl font-bold leading-none tracking-tight text-right">
						{displayName}
					</div>
					{data.isPortable && (
						<form id="addSiteLocationForm" onSubmit={(e) => {
								e.preventDefault();
								if (isEditing) {
									setLocationPending(true);
									setLocation(displayName, tempLocation);
								}
								setIsEditing(!isEditing);
							}}>
							<div className="leading-none gap-2 items-center flex flex-row tracking-tight text-right my-2">
								<Input
									isReadOnly={!isEditing}
									type="text"
									label="מיקום נוכחי"
									variant="bordered"
									defaultValue={location[displayName]}
									className="max-w-fit"
									onValueChange={(e) => { setTempLocation(e) }}
									size="sm"
								/>
								<Button
									size="lg"
									isIconOnly
									radius="sm"
									className="bg-card shadow-lg border-[1.5px] dark:bg-secondary"
									isLoading={locationPending}
									onPress={() => {
										if (isEditing) {
											setLocationPending(true);
											setLocation(displayName, tempLocation);
										}
										setIsEditing(!isEditing);
									}}
								>
									{isEditing ? (
										<SaveIcon size={24} />
									) : (
										<Edit3Icon size={24} />
									)}
								</Button>
							</div>
						</form>
					)}
				</div>
				{hasMonitoringData && (
					<div className="self-center lg:w-full max-w-2xl">
						<SiteCard
							siteName={data.displayName}
							site={data}
							key={data.displayName}
							variant="modal"
						/>
					</div>
				)}
			</ModalHeader>
			<ModalBody className={hasMonitoringData ? "" : "pb-8"}>
				{hasMonitoringData ? (
					<ScrollShadow hideScrollBar className="w-full">
						<DataAccordion data={data} />
					</ScrollShadow>
				) : (
					<div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-red-500/30 bg-red-500/5 px-6 py-8 text-center font-heebo" dir="rtl">
						<div className="mb-4 rounded-full bg-red-500/10 p-4 text-red-500">
							<WifiOff size={38} aria-hidden="true" />
						</div>
						<h3 className="text-xl font-bold">האתר אינו זמין כרגע</h3>
						<p className="mt-2 max-w-md text-muted-foreground">
							לא התקבלו נתוני ניטור מהאתר. הנתונים יוצגו כאן באופן אוטומטי כשהתקשורת תחזור.
						</p>
						<div className="mt-5 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
							{data?.area && <span className="rounded-full border bg-background/60 px-3 py-1">אזור {data.area}</span>}
							{data?.defaultLocation && (
								<span className="inline-flex items-center gap-1 rounded-full border bg-background/60 px-3 py-1" dir="ltr">
									<MapPin size={14} aria-hidden="true" />
									{data.defaultLocation}
								</span>
							)}
						</div>
					</div>
				)}
			</ModalBody>
			{inDashboard && (
				<ModalFooter className="flex justify-between">
					<Button
						className="bg-card text-lg shadow-lg border-[1.5px] dark:bg-secondary"
						onPress={() => {
							handlePrev();
						}}
					>
						<SkipForwardIcon size={24} />
						קודם
					</Button>
					<Button
						className="bg-card text-lg shadow-lg border-[1.5px] dark:bg-secondary"
						onPress={() => {
							handleNext();
						}}
					>
						הבא
						<SkipBackIcon size={24} />
					</Button>
				</ModalFooter>
			)}
		</ModalContent>
	);
};

export default Content;
