"use client";

import Link from "next/link";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import SearchBar from "@/components/main-navbar/search-bar";
import { ModeToggle } from "@/components/main-navbar/mode-toggle";
import { NavItem } from "@/components/main-navbar/navigation-item";
import { useSitesStore } from "@/stores/sites-store";
import { Button } from "@nextui-org/react";
import { revalidateEvetything } from "@/actions/revalidate"
import { mutate } from "swr";
	
/**
 * Renders the navigation bar component.
 * @returns The JSX element representing the navigation bar.
 */
export default function Navbar() {
	const { setFilterString } = useSitesStore();

	return (
		<header className="sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6 z-10 bg-transparent backdrop-blur font-heebo">
			<nav className="hidden flex-col gap-4 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
				<Link href="/" className="" prefetch={true}>
					<h1 className="text-4xl font-bold text-primary font-pixelify">VISION</h1>
				</Link>
				<NavItem href="/">לוח מחוונים</NavItem>
				<NavItem href="/map">מפה</NavItem>
				<NavItem href="/settings">הגדרות</NavItem>
			</nav>
			<div className="flex flex-none items-center gap-4 mr-auto">
				<Select dir="rtl" onValueChange={(value: "הכל" | "צפון" | "מרכז" | "דרום" | "כלים ניידים") => {
					setFilterString(value);
				}}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="סינון" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="הכל">הכל</SelectItem>
						<SelectItem value="צפון">צפון</SelectItem>
						<SelectItem value="מרכז">מרכז</SelectItem>
						<SelectItem value="דרום">דרום</SelectItem>
						<SelectItem value="כלים ניידים">כלים ניידים</SelectItem>
					</SelectContent>
				</Select>
				<SearchBar />
				<ModeToggle />
				{process.env.NODE_ENV === "development" && <Button
					onPress={() => {
						revalidateEvetything();
						mutate("/api/sites-data");
					}}
				>
					revalidate
				</Button>
				}
			</div>
		</header>
	);
};