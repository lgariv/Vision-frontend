import { create } from "zustand";

type AlertsStore = {
	searchString?: string;
	setSearchString: (search: string) => void;
	filterString: "REGEX" | "BEGINS" | "ENDS" | "CONTAINS";
	setFilterString: (filter: "REGEX" | "BEGINS" | "ENDS" | "CONTAINS") => void;
	selectedKeys: any[] | "all";
	setSelectedKeys: (keys: any[] | "all") => void;
	editedAlert?: AllowedAlert;
	setEditedAlert: (alert: AllowedAlert) => void;
};

export const useAlertsStore = create<AlertsStore>()((set) => ({
	searchString: undefined,
	setSearchString: (search) => {
		set(() => ({ searchString: search }));
	},
	filterString: "BEGINS",
	setFilterString: (filter) => {
		set(() => ({ filterString: filter }));
	},
	selectedKeys: [],
	setSelectedKeys: (keys) => {
		set(() => ({ selectedKeys: keys }));
	},
	editedAlert: undefined,
	setEditedAlert: (alert) => {
		set(() => ({ editedAlert: alert }));
	},
}));