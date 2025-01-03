import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
} from "@nextui-org/react";
import { useState } from "react";

type ConfirmationModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (password: string) => void;
};

export default function ConfirmationModal({
	isOpen,
	onClose,
	onConfirm,
}: ConfirmationModalProps) {
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const authenticateUser = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/authenticate-user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ password }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Authentication failed");
			}

			// Authentication succeeded
			onConfirm(password);
			setPassword("");
		} catch (error: any) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onClose}>
			<ModalContent>
				{(onCloseContent) => (
					<form onSubmit={authenticateUser}>
						<ModalHeader className="flex flex-col gap-1 font-heebo">
							אישור גישה
						</ModalHeader>
						<ModalBody className="font-heebo">
							<Input
								name="password"
								label="סיסמה"
								type="password"
								description="יש להכניס סיסמה למשתמש Admin על מנת להחיל שינויים אלו"
								value={password}
								onValueChange={(value) => setPassword(value)}
							/>
							{error && (
								<p className="text-red-500 text-sm mt-2">
									התחברות נכשלה.
								</p>
							)}
						</ModalBody>
						<ModalFooter>
							<Button
								className="text-destructive bg-transparent hover:bg-destructive/20 font-heebo"
								onPress={() => {
									setPassword("");
									setError(null);
									onClose();
								}}
								isDisabled={isLoading}
							>
								ביטול
							</Button>
							<Button
								color="primary"
								className="font-heebo"
								type="submit"
								isDisabled={password.length === 0 || isLoading}
							>
								{isLoading ? "מאמת..." : "אישור"}
							</Button>
						</ModalFooter>
					</form>
				)}
			</ModalContent>
		</Modal>
	);
}
