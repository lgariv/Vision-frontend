import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type PreferencesStore = {
	primaryValue: "UEs" | "RR" | undefined;
	setPrimaryValue: (value: "UEs" | "RR" | undefined) => void;
	location: { [key: string]: string };
	setLocation: (key: string, value: string) => void;
};

export const usePreferencesStore = create<PreferencesStore>()(
	persist(
		(set, get) => ({
			primaryValue: "UEs",
			setPrimaryValue: (value: "UEs" | "RR" | undefined) => {
				set(() => ({ primaryValue: value || get().primaryValue }));
			},
			location: {},
			setLocation: (key: string, value: string) => {
				set(() => ({ location: { ...get().location, [key]: value } }));
			},
		}),
		{
			name: "preferences-storage", // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
		}
	)
);