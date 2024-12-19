import { create } from "zustand";

type SitesStore = {
	sitesData?: [SiteData];
	setSitesData: (data: [SiteData]) => void;
	searchString?: string;
	setSearchString: (search: string) => void;
	filterString: "הכל" | "צפון" | "מרכז" | "דרום" | "כלים ניידים";
	setFilterString: (
		filter: "הכל" | "צפון" | "מרכז" | "דרום" | "כלים ניידים"
	) => void;
	selectedKeys: any[] | "all";
	setSelectedKeys: (keys: any[] | "all") => void;
	editedSite?: Site;
	setEditedSite: (site: Site) => void;
};

export const useSitesStore = create<SitesStore>()((set) => ({
	sitesData: undefined,
	setSitesData: (data) => {
		set(() => ({ sitesData: data }));
	},
	searchString: undefined,
	setSearchString: (search) => {
		set(() => ({ searchString: search }));
	},
	filterString: "הכל",
	setFilterString: (filter) => {
		set(() => ({ filterString: filter }));
	},
	selectedKeys: [],
	setSelectedKeys: (keys) => {
		set(() => ({ selectedKeys: keys }));
	},
	editedSite: undefined,
	setEditedSite: (site) => {
		set(() => ({ editedSite: site }));
	},
}));