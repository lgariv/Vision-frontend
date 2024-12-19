import { Chip, ChipProps, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import { Input } from "@/components/ui/input";
import { useAlertsList } from "@/utils/use-alerts-list";
import { useCallback, useMemo, useState } from 'react';
import AlertModal from './delete-create-alert-modal';
import { useAlertsStore } from '@/stores/alerts-store';
import EditAlertModal from './edit-alert-modal';

/**
 * Renders a table of alerts with search and pagination functionality.
 * @returns {JSX.Element} The rendered SitesTable component.
 */
export default function AllowedAlertsTable() {
	const { data: alertslist, isLoading } = useAlertsList();

	const { editedAlert, setEditedAlert, selectedKeys, setSelectedKeys } =
		useAlertsStore();

	const {
		isOpen: isEditOpen,
		onOpen: onEditOpen,
		onOpenChange: onEditOpenChange,
	} = useDisclosure();

	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [filterValue, setFilterValue] = useState("");

	const hasSearchFilter = Boolean(filterValue);

	const sortedItems = useMemo(() => {
		return alertslist?.sort((a: AllowedAlert, b: AllowedAlert) => {
			return a.id - b.id;
		});
	}, [alertslist]);
	
	const filteredItems = useMemo(() => {
		let filteredAlerts: AllowedAlert[] = sortedItems;

		if (hasSearchFilter) {
			filteredAlerts = filteredAlerts.filter((alert) =>
				alert.body.toLowerCase().includes(filterValue.toLowerCase()) ||
				alert.modifier.toLowerCase().includes(filterValue.toLowerCase())
			);
		}

		return filteredAlerts;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortedItems, filterValue]);

	const pages = Math.ceil(filteredItems?.length / rowsPerPage);

	const slicedItems: AllowedAlert[] = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return filteredItems?.slice(start, end) || [];
	}, [page, filteredItems, rowsPerPage]);

	const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setRowsPerPage(Number(e.target.value));
		setPage(1);
	}, []);

	const renderCell = useCallback((alert: AllowedAlert, columnKey: React.Key) => {
		switch (columnKey) {
			case "$.0":
				return alert.body;
			case "$.1":
				return (
					<Chip color="primary" size="sm" variant="flat">
						{alert.modifier}
					</Chip>
				);
			default:
				return null;
		}
	}, []);

	return (
		<>
			<div className="flex justify-between gap-3 items-end">
				<Input
					type="search"
					placeholder="חיפוש..."
					className="w-[200px] h-[32px] shadow-sm light:shadow-accent"
					onInput={(e: React.FormEvent<HTMLInputElement>) => {
						e.preventDefault();
						setFilterValue(e.currentTarget.value);
					}}
				/>
				<AlertModal shouldDelete={selectedKeys.length !== 0} />
			</div>

			<div className="flex justify-between items-center">
				<span className="text-muted-foreground text-small">
					סך הכל {alertslist?.length || 0} התראות
				</span>
				<label className="flex items-center text-muted-foreground text-small">
					מספר שורות לעמוד:
					<select
						className="bg-transparent outline-none text-muted-foreground text-small"
						onChange={onRowsPerPageChange}
					>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="15">15</option>
					</select>
				</label>
			</div>

			<EditAlertModal
				isOpen={isEditOpen}
				onOpenChange={onEditOpenChange}
				alertslist={alertslist}
			/>

			<Table
				color="primary"
				selectionMode="multiple"
				selectedKeys={selectedKeys}
				onSelectionChange={(keys: string) =>
					setSelectedKeys(keys !== "all" ? Array.from(keys) : keys)
				}
				// TODO: add edit modal
				onRowAction={(key: string) => {
					setEditedAlert(
						alertslist?.find((alert: AllowedAlert) => alert.id == Number(key))
					);
					onEditOpen();
				}}
				shadow="sm"
				// layout="fixed"
				// isStriped
				// isCompact
				// removeWrapper
				bottomContentPlacement="outside"
				bottomContent={
					<div className="flex w-full justify-between items-center">
						<span className="w-[30%] text-small text-muted-foreground">
							{selectedKeys === "all"
								? `כל ההתראות המוגדרות נבחרו (${filteredItems?.length} מתוך ${filteredItems?.length})`
								: `${selectedKeys.length || 0} מתוך ${
										filteredItems?.length
								  } נבחרו`}
						</span>
						<Pagination
							isCompact
							showControls
							page={page}
							total={pages || 1}
							onChange={(page) => setPage(page)}
							disableCursorAnimation
						/>
						<div className="flex w-[30%] justify-end" />
					</div>
				}
			>
				<TableHeader>
					<TableColumn>תוכן</TableColumn>
					<TableColumn>סוג</TableColumn>
				</TableHeader>
				<TableBody items={slicedItems}>
					{(item) => (
						<TableRow key={item.id}>
							{(columnKey) => (
								<TableCell>
									{renderCell(item, columnKey)}
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</>
	);
}
