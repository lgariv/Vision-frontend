import { useAlertsStore } from "@/stores/alerts-store";
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
} from "@nextui-org/react";
import { updateAlert } from "@/actions/forms";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { mutate } from "swr";

type Props = {
	isOpen: boolean;
	onOpenChange: () => void;
	alertslist: any;
};

/**
 * Renders a modal component for managing allowed alerts.
 * @param {Props} shouldDelete - Indicates whether the alert should be deleted.
 * @returns {JSX.Element} The rendered modal component.
 */
export default function EditAlertModal({ isOpen, onOpenChange, alertslist }: Props) {
	const [updateAlertState, updateAlertFormAction] = useFormState(
		updateAlert,
		null
	);

	const { editedAlert } = useAlertsStore();

	const [body, setBody] = useState("");
	const [modifier, setModifier] = useState("");

	useEffect(() => {
		if (updateAlertState !== null) {
			mutate("/api/alerts-list");
		}
	}, [updateAlertState]);

	useEffect(() => {
		setBody(editedAlert?.body || "");
		setModifier(editedAlert?.modifier || "");
	}, [editedAlert]);

	return (
		<>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1 font-heebo">
								עריכת התראה
							</ModalHeader>
							<ModalBody className="font-heebo">
								<form
									action={updateAlertFormAction}
									id="updatealertform"
								>
									<input
										name="id"
										value={`${editedAlert!.id}`}
										hidden={true}
										aria-hidden={true}
									/>
									<Input
										name="body"
										label="תוכן"
										description="תוכן הפילטר של ההתראה"
										value={body}
										onValueChange={(value) =>
											setBody(value)
										}
									/>
									<Select
										name="modifier"
										isRequired
										label="סוג"
										description="סוג הפילטר בעזרתו יסוננו התראות"
										defaultSelectedKeys={[modifier]}
										selectedKeys={[modifier]}
										onSelectionChange={(keys) => {
											setModifier(
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
													color="primary"
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
											key={"REGEX"}
											textValue={"REGEX"}
										>
											<Chip
												color="primary"
												variant="flat"
											>
												REGEX
											</Chip>
										</SelectItem>
										<SelectItem
											key={"BEGINS"}
											textValue={"BEGINS"}
										>
											<Chip
												color="primary"
												variant="flat"
											>
												BEGINS
											</Chip>
										</SelectItem>
										<SelectItem
											key={"ENDS"}
											textValue={"ENDS"}
										>
											<Chip
												color="primary"
												variant="flat"
											>
												ENDS
											</Chip>
										</SelectItem>
										<SelectItem
											key={"CONTAINS"}
											textValue={"CONTAINS"}
										>
											<Chip
												color="primary"
												variant="flat"
											>
												CONTAINS
											</Chip>
										</SelectItem>
									</Select>
								</form>
							</ModalBody>
							<ModalFooter>
								<Button
									className="text-destructive bg-transparent hover:bg-destructive/20 font-heebo"
									onPress={() => {
										setBody(editedAlert?.body || "");
										setModifier(editedAlert?.modifier || "");
										onClose();
									}}
								>
									ביטול
								</Button>
								<Button
									color="primary"
									className="font-heebo"
									onPress={() => {
										setBody(editedAlert?.body || "");
										setModifier(editedAlert?.modifier || "");
										onClose();
									}}
									type="submit"
									form="updatealertform"
									isDisabled={
										body?.length === 0 ||
										modifier?.length === 0
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