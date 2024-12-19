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

const statusColorMap: Record<string, ChipProps["color"]> = {
	צפון: "success",
	מרכז: "warning",
	דרום: "danger",
};

const validateLocation = (value: string) => value.match(/^[0-9]+.[0-9]+$/i);
const validateIP = (value: string) => value.match(/^([0-9]{1,3}\.){3}[0-9]{1,3}$/);

type Props = {
	isOpen: boolean;
	onOpenChange: () => void;
	sitelist: any;
};

/**
 * Renders a modal component for managing sites.
 * @param {Props} shouldDelete - Indicates whether the site should be deleted.
 * @returns {JSX.Element} The rendered modal component.
 */
export default function EditSiteModal({ isOpen, onOpenChange, sitelist }: Props) {
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
								<form
									action={newSiteFormAction}
									id="newsiteform"
								>
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
										description="השם שיש להציג ב-Dogma"
										// description="השם שיש להציג ב-Vision"
										isRequired
										value={displayName}
										onValueChange={(value) =>
											setDisplayName(value)
										}
									/>
									<Select
										name="pikud"
										isRequired
										label="פיקוד"
										description="הפיקוד אליו שייך האתר"
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
										<SelectItem
											key={"מרכז"}
											textValue={"מרכז"}
										>
											<Chip
												color={statusColorMap["מרכז"]}
												variant="flat"
											>
												מרכז
											</Chip>
										</SelectItem>
										<SelectItem
											key={"דרום"}
											textValue={"דרום"}
										>
											<Chip
												color={statusColorMap["דרום"]}
												variant="flat"
											>
												דרום
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
									<Select
										name="type"
										isRequired
										label="סוג תחנת בסיס"
										description="סוג תחנת הבסיס של האתר"
										defaultSelectedKeys={[type]}
										selectedKeys={[type]}
										onSelectionChange={(keys) => {
											setType(
												Array.from(keys)[0] != undefined
													? Array.from(
															keys
													  )[0].toString()
													: ""
											);
										}}
									>
										<SelectItem
											key={"DUS"}
											textValue={"DUS"}
										>
											DUS
										</SelectItem>
										<SelectItem
											key={"BBU"}
											textValue={"BBU"}
										>
											BBU
										</SelectItem>
									</Select>
									<Select
										name="isPortable"
										isRequired
										label="סוג אתר"
										description="האם האתר הוא נייח או נייד"
										defaultSelectedKeys={[isPortable]}
										selectedKeys={[isPortable]}
										onSelectionChange={(keys) => {
											setIsPortable(
												Array.from(keys)[0] != undefined
													? Array.from(
															keys
													  )[0].toString()
													: ""
											);
										}}
									>
										<SelectItem
											key={"נייד"}
											textValue={"נייד"}
										>
											נייד
										</SelectItem>
										<SelectItem
											key={"נייח"}
											textValue={"נייח"}
										>
											נייח
										</SelectItem>
									</Select>
									<div
										className={`flex gap-4 ${
											isPortable === "נייח"
												? ""
												: "hidden"
										}`}
									>
										<Input
											name="longitude"
											label="קו אורך"
											description="קו האורך של האתר"
											fullWidth={false}
											value={longitude}
											onValueChange={(value) =>
												setLongitude(value)
											}
											isInvalid={isLongInvalid}
											errorMessage="פורמט קו אורך לא תקין"
										/>
										<Input
											name="latitude"
											label="קו רוחב"
											description="קו הרוחב של האתר"
											fullWidth={false}
											value={latitude}
											onValueChange={(value) =>
												setLatitude(value)
											}
											isInvalid={isLatInvalid}
											errorMessage="פורמט קו רוחב לא תקין"
										/>
									</div>
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
									type="submit"
									form="newsiteform"
									isDisabled={
										siteName?.length === 0 ||
										displayName?.length === 0 ||
										pikud?.length === 0 ||
										type?.length === 0 ||
										isPortable === undefined ||
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
		</>
	);
}
