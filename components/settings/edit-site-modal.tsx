import { useSitesStore } from "@/stores/sites-store";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Select,
	SelectItem,
	Chip,
	ChipProps,
} from "@nextui-org/react";
import { submitNewSite } from "@/actions/forms";
import { useEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";
import { mutate } from "swr";
import ConfirmationModal from "./confirmation-modal";

const statusColorMap: Record<string, ChipProps["color"]> = {
	צפון: "success",
	מרכז: "warning",
	דרום: "danger",
};

const validateLocation = (value: string) => value.match(/^[0-9]+.[0-9]+$/i);
const validateIP = (value: string) =>
	value.match(/^([0-9]{1,3}\.){3}[0-9]{1,3}$/);

type Props = {
	isOpen: boolean;
	onOpenChange: () => void;
};

/**
 * Renders a modal component for editing sites with password confirmation.
 * @param {Props} shouldDelete - Indicates whether the site should be deleted.
 * @returns {JSX.Element} The rendered modal component.
 */
export default function EditSiteModal({ isOpen, onOpenChange }: Props) {
	const [createNewSiteState, newSiteFormAction] = useFormState(
		submitNewSite,
		null
	);

	const { editedSite } = useSitesStore();

	const [siteName, setSiteName] = useState("editedSite");
	const [displayName, setDisplayName] = useState("");
	const [pikud, setPikud] = useState("");
	const [type, setType] = useState("");
	const [siteIP, setSiteIP] = useState("");
	const [isPortable, setIsPortable] = useState("");
	const [longitude, setLongitude] = useState("");
	const [latitude, setLatitude] = useState("");
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

	const isLongInvalid = useMemo(() => {
		if (longitude === "") return false;
		return validateLocation(longitude) ? false : true;
	}, [longitude]);

	const isLatInvalid = useMemo(() => {
		if (latitude === "") return false;
		return validateLocation(latitude) ? false : true;
	}, [latitude]);

	const isIPInvalid = useMemo(() => {
		if (siteIP === "") return false;
		return validateIP(siteIP) ? false : true;
	}, [siteIP]);

	useEffect(() => {
		if (createNewSiteState !== null) {
			mutate("/api/site-list");
		}
	}, [createNewSiteState]);

	useEffect(() => {
		setSiteName(editedSite?.id || "");
		setDisplayName(editedSite?.siteNameForUser || "");
		setPikud(editedSite?.pikud || "");
		setType(editedSite?.siteType || "");
		setSiteIP(editedSite?.siteIP || "");
		setIsPortable(editedSite?.isPortable ? "נייד" : "נייח");
		setLongitude(editedSite?.defaultLocation.split(",")[0] || "");
		setLatitude(editedSite?.defaultLocation.split(",")[1] || "");
	}, [editedSite]);

	const handleSave = (password: string) => {
		const formData = new FormData();
		formData.append("siteName", siteName);
		formData.append("displayName", displayName);
		formData.append("pikud", pikud);
		formData.append("type", type);
		formData.append("siteIP", siteIP);
		formData.append("isPortable", isPortable);
		formData.append("longitude", longitude);
		formData.append("latitude", latitude);
		formData.append("password", password);
		newSiteFormAction(formData);
		setIsConfirmationOpen(false);
	};

	return (
		<>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1 font-heebo">
								עריכת אתר
							</ModalHeader>
							<ModalBody className="font-heebo">
								<form id="newsiteform">
									<Input
										name="siteName"
										label="AMOS"
										description="שם האתר ב-ENM"
										value={siteName}
										isReadOnly
									/>
									<Input
										name="displayName"
										label="שם תצוגה"
										description="השם שיש להציג ב-Vision"
										isRequired
										value={displayName}
										onValueChange={(value) =>
											setDisplayName(value)
										}
									/>
									<Select
										name="pikud"
										isRequired
										label="גזרה"
										description="הגזרה אליה שייך האתר"
										defaultSelectedKeys={[pikud]}
										selectedKeys={[pikud]}
										onSelectionChange={(keys) => {
											setPikud(
												Array.from(keys)[0] !==
													undefined
													? Array.from(
															keys
													  )[0].toString()
													: ""
											);
										}}
										renderValue={(items) => {
											return items.map((item) => (
												<Chip
													color={
														statusColorMap[
															item.textValue!
														]
													}
													variant="flat"
													size="sm"
													key={item.key}
												>
													{item.textValue}
												</Chip>
											));
										}}
									>
										<SelectItem
											key={"צפון"}
											textValue={"צפון"}
										>
											<Chip
												color={statusColorMap["צפון"]}
												variant="flat"
											>
												צפון
											</Chip>
										</SelectItem>
									</Select>
									<Input
										name="siteIP"
										label="כתובת IP"
										description="כתובת ה-IP של האתר המוגדרת ב-ENM (אופציונלי)"
										value={siteIP}
										onValueChange={(value) =>
											setSiteIP(value)
										}
										isInvalid={isIPInvalid}
										errorMessage="פורמט כתובת IP לא תקין"
									/>
									{/* Other Inputs... */}
								</form>
							</ModalBody>
							<ModalFooter>
								<Button
									className="text-destructive bg-transparent hover:bg-destructive/20 font-heebo"
									onPress={() => {
										setSiteName("");
										setDisplayName("");
										setPikud("");
										setType("");
										setSiteIP("");
										setIsPortable("");
										setLongitude("");
										setLatitude("");
										onClose();
									}}
								>
									ביטול
								</Button>
								<Button
									color="primary"
									className="font-heebo"
									onPress={() => {
										setIsConfirmationOpen(true);
										onClose();
									}}
									isDisabled={
										displayName.length === 0 ||
										pikud.length === 0 ||
										type.length === 0 ||
										(isLongInvalid && longitude !== "") ||
										(isLatInvalid && latitude !== "") ||
										(isIPInvalid && siteIP !== "")
									}
								>
									שמירה
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
			<ConfirmationModal
				isOpen={isConfirmationOpen}
				onClose={() => setIsConfirmationOpen(false)}
				onConfirm={handleSave}
			/>
		</>
	);
}
