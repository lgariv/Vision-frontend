import { useAlertsStore } from "@/stores/alerts-store";
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
} from "@nextui-org/react";
import { DeleteIcon, PlusIcon } from "lucide-react";
import { deleteAlert, submitNewAlert } from "@/actions/forms";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { mutate } from "swr";

type Props = {
    shouldDelete: boolean;
};

/**
 * Renders a modal component for managing alerts.
 * @param {Props} shouldDelete - Indicates whether the alert should be deleted.
 * @returns {JSX.Element} The rendered modal component.
 */
export default function AlertModal({ shouldDelete }: Props) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [createNewAlertState, newAlertFormAction] = useFormState(submitNewAlert, null);
	const [deleteState, deleteFormAction] = useFormState(deleteAlert, null);
    
	const { selectedKeys, setSelectedKeys } = useAlertsStore();

	const [deletePending, setDeletePending] = useState(false);
	const [createPending, setCreatePending] = useState(false);
	const [body, setBody] = useState("");
	const [modifier, setModifier] = useState("BEGINS");

	useEffect(() => {
		if (createNewAlertState !== null || deleteState !== null) {
			mutate("/api/alerts-list");
			setDeletePending(false);
			setCreatePending(false);
		}
	}, [createNewAlertState, deleteState]);

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
										<form
											action={deleteFormAction}
											id="deleteform"
										>
											<input
												type="hidden"
												name="allowedAlertId"
												value={selectedKeys}
											/>
											<p>
												האם אתה בטוח שברצונך למחוק את
												הפילטרים שנבחרו?
											</p>
										</form>
									</ModalBody>
									<ModalFooter>
										<Button
											className="text-destructive bg-transparent hover:bg-destructive/20 font-heebo"
											onPress={onClose}
										>
											ביטול
										</Button>
										<Button
											className="bg-destructive text-primary-foreground font-heebo"
											type="submit"
											form="deleteform"
											onPress={() => {
												setDeletePending(true);
												onClose();
												setSelectedKeys([]);
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
						הוסף פילטר
					</Button>
					<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex flex-col gap-1 font-heebo">
										פילטר חדש
									</ModalHeader>
									<ModalBody className="font-heebo">
										<form
											action={newAlertFormAction}
											id="newalertform"
										>
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
												setBody("");
												setModifier("");
												onClose();
											}}
										>
											ביטול
										</Button>
										<Button
											color="primary"
											className="font-heebo"
											onPress={() => {
												setBody("");
												setModifier("");
												setCreatePending(true);
												onClose();
											}}
											type="submit"
											form="newalertform"
											isDisabled={
												body.length === 0 ||
												modifier.length === 0
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
		</>
	);
}
