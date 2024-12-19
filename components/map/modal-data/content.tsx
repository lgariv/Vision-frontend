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
import { Edit3Icon, SaveIcon, SkipBackIcon, SkipForwardIcon } from "lucide-react";
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
				<div className="self-center lg:w-full max-w-2xl">
					<SiteCard
						siteName={data.displayName}
						site={data}
						key={data.displayName}
						variant="modal"
					/>
				</div>
			</ModalHeader>
			<ModalBody>
				<ScrollShadow hideScrollBar className="w-full">
					<DataAccordion data={data} />
				</ScrollShadow>
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
