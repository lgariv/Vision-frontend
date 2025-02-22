import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Pixelify_Sans, Heebo } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const heebo = Heebo({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-heebo",
});

const pixelify = Pixelify_Sans({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-pixelify",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Vision",
	description: "Generated by Telekrav Development",
};

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			dir="rtl"
			className={`${heebo.variable} ${pixelify.variable}`}
		>
			<Analytics />
			<SpeedInsights />
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					themes={["light", "dark"]}
				>
					{modal}
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
