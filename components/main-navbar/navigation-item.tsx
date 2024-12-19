"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
	href: string;
	children?: React.ReactNode; // Define the prop for children (optional)
};

/**
 * Renders a navigation item with a link.
 * @param {string} href - The URL of the link.
 * @param {React.ReactNode} children - The content of the navigation item.
 * @returns {JSX.Element} The rendered navigation item.
 */
export function NavItem({ href, children }: NavItemProps) {
	const pathname = usePathname();
	const active = pathname === href;

	return (
		<Link
			href={href}
			className={
				active
					? "text-primary font-semibold transition-colors hover:text-primary"
					: "text-muted-foreground transition-colors hover:text-foreground"
			}
			prefetch={true}
		>
			{children}
		</Link>
	);
}
