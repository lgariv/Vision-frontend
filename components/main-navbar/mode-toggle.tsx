"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Renders a mode toggle component.
 * The mode toggle allows the user to switch between different themes.
 * @returns {JSX.Element} The rendered mode toggle item.
 */
export function ModeToggle() {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu dir="rtl">
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					בהיר
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					כהה
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					מערכת
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
