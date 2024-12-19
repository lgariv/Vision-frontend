"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSitesStore } from "@/stores/sites-store";

/**
 * Renders a search bar component.
 * @returns {JSX.Element} The rendered navigation item.
 */
export default function SearchBar() {
	const { setSearchString } = useSitesStore();

	return (
		<form className="ml-auto flex-1 sm:flex-initial" onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
			<div className="relative">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					type="search"
					placeholder="שם אתר..."
					className="pl-8 sm:w-[200px] md:w-[200px] lg:w-[200px]"
					onInput={(e: React.FormEvent<HTMLInputElement>) => {
						e.preventDefault();
						setSearchString(e.currentTarget.value);
					}}
				/>
			</div>
		</form>
	);
}
