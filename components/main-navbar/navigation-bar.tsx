"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
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
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Add effect to control body scroll
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.pointerEvents = 'none';
        } else {
            document.body.style.pointerEvents = "auto";
        }
	}, [isMenuOpen]);

	return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6 z-10 bg-transparent backdrop-blur font-heebo">
            <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="" prefetch={true}>
                        <h1 className="text-4xl font-bold text-primary font-pixelify">VISION</h1>
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex md:items-center md:gap-5 lg:gap-6">
                        <NavItem href="/">לוח מחוונים</NavItem>
                        <NavItem href="/map">מפה</NavItem>
                        <NavItem href="/settings">הגדרות</NavItem>
                    </nav>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden pointer-events-auto"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Controls */}
                <div className="hidden md:flex items-center gap-4">
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
                    {process.env.NODE_ENV === "development" && (
                        <Button
                            onPress={() => {
                                revalidateEvetything();
                                mutate("/api/sites-data");
                            }}
                        >
                            revalidate
                        </Button>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
			{isMenuOpen && (
				<div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden p-4 pointer-events-auto">
					<div className="grid grid-cols-2 gap-4">
						<div className="grid grid-cols-1 space-y-4">
							<NavItem href="/">לוח מחוונים</NavItem>
							<NavItem href="/map">מפה</NavItem>
							<NavItem href="/settings">הגדרות</NavItem>
						</div>
						<div className="space-y-4">
							<Select dir="rtl" onValueChange={(value: "הכל" | "צפון" | "מרכז" | "דרום" | "כלים ניידים") => {
								setFilterString(value);
							}}>
								<SelectTrigger className="w-full">
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
                            <div className="space-s-4 gap-4 flex flex-row justify-items-stretch">
                                <SearchBar />
                                <ModeToggle />
                            </div>
						</div>
					</div>
				</div>
            )}
        </header>
    );
}