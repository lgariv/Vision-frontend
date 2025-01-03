import { Chip, ChipProps, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import { Input } from "@/components/ui/input";
import { useSiteList } from '@/utils/use-site-list';
import { useCallback, useMemo, useState } from 'react';
import SiteModal from './delete-create-site-modal';
import { useSitesStore } from '@/stores/sites-store';
import EditSiteModal from './edit-site-modal';

const statusColorMap: Record<string, ChipProps["color"]> = {
	צפון: "success",
	מרכז: "warning",
	דרום: "danger",
};

/**
 * Renders a table of sites with search and pagination functionality.
 * @returns {JSX.Element} The rendered SitesTable component.
 */
export default function SitesTable() {
	const { data: sitelist, isLoading } = useSiteList();

	const { setEditedSite, selectedKeys, setSelectedKeys } = useSitesStore();

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
		return sitelist?.sort((a: Site, b: Site) => {
			return a.id.localeCompare(b.id);
		});
	}, [sitelist]);
	
	const filteredItems = useMemo(() => {
		let filteredSites: Site[] = sortedItems;

		if (hasSearchFilter) {
			filteredSites = filteredSites.filter((site) =>
				site.id.toLowerCase().includes(filterValue.toLowerCase()) ||
				site.siteNameForUser.toLowerCase().includes(filterValue.toLowerCase()) ||
				site.pikud.toLowerCase().includes(filterValue.toLowerCase()) ||
				site.siteType.toLowerCase().includes(filterValue.toLowerCase())
			);
		}

		return filteredSites;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortedItems, filterValue]);

	const pages = Math.ceil(filteredItems?.length / rowsPerPage);

	const slicedItems: Site[] = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return filteredItems?.slice(start, end) || [];
	}, [page, filteredItems, rowsPerPage]);

	const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setRowsPerPage(Number(e.target.value));
		setPage(1);
	}, []);

	const renderCell = useCallback((site: Site, columnKey: React.Key) => {
		switch (columnKey) {
			case "$.0":
				return site.id;
			case "$.1":
				return site.siteNameForUser;
			case "$.2":
				return (
					<Chip
						color={statusColorMap[site.pikud]}
						size="sm"
						variant="flat"
					>
						{site.pikud}
					</Chip>
				);
			case "$.3":
				return site.siteType;
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
				<SiteModal shouldDelete={selectedKeys.length !== 0} />
			</div>

			<div className="flex justify-between items-center">
				<span className="text-muted-foreground text-small">
					סך הכל {sitelist?.length || 0} אתרים
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

			<EditSiteModal isOpen={isEditOpen} onOpenChange={onEditOpenChange} sitelist={sitelist} />

			<Table
				color="primary"
				selectionMode="multiple"
				selectedKeys={selectedKeys}
				onSelectionChange={(keys: string) =>
					setSelectedKeys(keys !== "all" ? Array.from(keys) : keys)
				}
				// TODO: add edit modal
				onRowAction={(key: string) => {
					setEditedSite(sitelist?.find((site: Site) => site.id == key));
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
								? `כל האתרים המוגדרים נבחרו (${filteredItems?.length} מתוך ${filteredItems?.length})`
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
					<TableColumn>AMOS</TableColumn>
					<TableColumn>תצוגה</TableColumn>
					<TableColumn>גזרה</TableColumn>
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
