import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type PreferencesStore = {
	_hasHydrated: boolean;
	setHasHydrated: (state: boolean) => void;
	primaryValue: "UEs" | "RR" | undefined;
	setPrimaryValue: (value: "UEs" | "RR" | undefined) => void;
	location: { [key: string]: string };
	setLocation: (key: string, value: string) => void;
	isOnboarded: boolean | undefined;
	setOnboarded: (value: boolean) => void;
};

export const usePreferencesStore = create<PreferencesStore>()(
	persist(
		(set, get) => ({
			_hasHydrated: false,
			setHasHydrated: (state) => {
				set({
				_hasHydrated: state
				});
			},
			primaryValue: "UEs",
			setPrimaryValue: (value: "UEs" | "RR" | undefined) => {
				set(() => ({ primaryValue: value || get().primaryValue }));
			},
			location: {},
			setLocation: (key: string, value: string) => {
				set(() => ({ location: { ...get().location, [key]: value } }));
			},
			isOnboarded: undefined,
			setOnboarded: (value: boolean) => {
				set(() => ({ isOnboarded: value }));
			},
		}),
		{
			onRehydrateStorage: (state) => {
				return () => state.setHasHydrated(true)
			},
			name: "preferences-storage", // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
		}
	)
);