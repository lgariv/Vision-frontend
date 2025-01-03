import { useSitesStore } from "@/stores/sites-store";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Input,
	Select,
	SelectItem,
	Chip,
	ChipProps,
} from "@nextui-org/react";
import { DeleteIcon, PlusIcon } from "lucide-react";
import { deleteSite, submitNewSite } from "@/actions/forms";
import { useEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";
import { mutate } from "swr";
import ConfirmationModal from "./confirmation-modal";

const statusColorMap: Record<string, ChipProps["color"]> = {
	צפון: "success",
	מרכז: "warning",
	דרום: "danger",
};

const validateLocation = (value: string) => /^[0-9]+.[0-9]+$/i.test(value);
const validateIP = (value: string) =>
	/^([0-9]{1,3}\.){3}[0-9]{1,3}$/.test(value);

type Props = {
	shouldDelete: boolean;
};

/**
 * Renders a modal component for managing sites with password confirmation.
 * @param {Props} shouldDelete - Indicates whether the site should be deleted.
 * @returns {JSX.Element} The rendered modal component.
 */
export default function SiteModal({ shouldDelete }: Props) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [createNewSiteState, newSiteFormAction] = useFormState(
		submitNewSite,
		null
	);
	const [deleteState, deleteFormAction] = useFormState(deleteSite, null);

	const { selectedKeys, setSelectedKeys } = useSitesStore();

	const [deletePending, setDeletePending] = useState(false);
	const [createPending, setCreatePending] = useState(false);
	const [siteName, setSiteName] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [pikud, setPikud] = useState("");
	const [type, setType] = useState("");
	const [siteIP, setSiteIP] = useState("");
	const [isPortable, setIsPortable] = useState("");
	const [longitude, setLongitude] = useState("");
	const [latitude, setLatitude] = useState("");
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
	const [pendingAction, setPendingAction] = useState<
		"delete" | "create" | null
	>(null);

	const isLongInvalid = useMemo(() => {
		if (longitude === "") return false;
		return !validateLocation(longitude);
	}, [longitude]);

	const isLatInvalid = useMemo(() => {
		if (latitude === "") return false;
		return !validateLocation(latitude);
	}, [latitude]);

	const isIPInvalid = useMemo(() => {
		if (siteIP === "") return false;
		return !validateIP(siteIP);
	}, [siteIP]);

	useEffect(() => {
		if (createNewSiteState !== null || deleteState !== null) {
			mutate("/api/site-list");
			setDeletePending(false);
			setCreatePending(false);
		}
	}, [createNewSiteState, deleteState]);

	const handleDelete = (password: string) => {
		setDeletePending(true);
		const formData = new FormData();
		formData.append("siteName", selectedKeys.toString());
		formData.append("password", password);
		deleteFormAction(formData);
		setIsConfirmationOpen(false);
		setSelectedKeys([]);
	};

	const handleCreate = (password: string) => {
		setCreatePending(true);
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
		setSiteName("");
		setDisplayName("");
		setPikud("");
		setType("");
		setSiteIP("");
		setIsPortable("");
		setLongitude("");
		setLatitude("");
	};

	const confirmDelete = () => {
		setPendingAction("delete");
		setIsConfirmationOpen(true);
	};

	const confirmCreate = () => {
		setPendingAction("create");
		setIsConfirmationOpen(true);
	};

	return (
		<>
			{shouldDelete || deletePending ? (
				<div>
					<Button
						onPress={onOpen}
						size="sm"
						startContent={
							deletePending ? null : <DeleteIcon size={20} />
						}
						className="bg-destructive text-primary-foreground"
						isLoading={deletePending}
					>
						מחיקה
					</Button>
					<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex flex-col gap-1 font-heebo">
										מחיקה
									</ModalHeader>
									<ModalBody className="font-heebo">
										<p>
											האם אתה בטוח שברצונך למחוק את האתרים
											שנבחרו?
										</p>
									</ModalBody>
									<ModalFooter>
										<Button
											className="text-destructive bg-transparent hover:bg-destructive/20 font-heebo"
											onPress={onClose}
										>
											ביטול
										</Button>
										<Button
											color="primary"
											className="bg-destructive text-primary-foreground font-heebo"
											onPress={() => {
												confirmDelete();
												onClose();
											}}
										>
											מחיקה
										</Button>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>
				</div>
			) : (
				<div>
					<Button
						onPress={onOpen}
						size="sm"
						startContent={
							createPending ? null : <PlusIcon size={20} />
						}
						color="primary"
						isLoading={createPending}
					>
						הוסף אתר
					</Button>
					<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex flex-col gap-1 font-heebo">
										אתר חדש
									</ModalHeader>
									<ModalBody className="font-heebo">
										<form id="newsiteform">
											<Input
												name="siteName"
												label="AMOS"
												description="שם האתר ב-ENM"
												isRequired
												onValueChange={(value) =>
													setSiteName(value)
												}
											/>
											<Input
												name="displayName"
												label="שם תצוגה"
												description="השם שיש להציג ב-Vision"
												isRequired
												onValueChange={(value) =>
													setDisplayName(value)
												}
											/>
											<Select
												name="pikud"
												isRequired
												label="גזרה"
												description="הגזרה אליה שייך האתר"
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
														color={
															statusColorMap[
																"צפון"
															]
														}
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
														color={
															statusColorMap[
																"מרכז"
															]
														}
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
														color={
															statusColorMap[
																"דרום"
															]
														}
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
												onSelectionChange={(keys) => {
													setType(
														Array.from(keys)[0] !=
															undefined
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
												onSelectionChange={(keys) => {
													setIsPortable(
														Array.from(keys)[0] !=
															undefined
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
												confirmCreate();
												onClose();
											}}
											isDisabled={
												siteName.length === 0 ||
												displayName.length === 0 ||
												pikud.length === 0 ||
												type.length === 0 ||
												isPortable === undefined ||
												(isLongInvalid &&
													longitude !== "") ||
												(isLatInvalid &&
													latitude !== "") ||
												(isIPInvalid && siteIP !== "")
											}
										>
											הוספה
										</Button>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>
				</div>
			)}

			{/* Password Confirmation Modal */}
			<ConfirmationModal
				isOpen={isConfirmationOpen}
				onClose={() => setIsConfirmationOpen(false)}
				onConfirm={(password) => {
					if (pendingAction === "delete") {
						handleDelete(password);
					} else if (pendingAction === "create") {
						handleCreate(password);
					}
				}}
			/>
		</>
	);
}
