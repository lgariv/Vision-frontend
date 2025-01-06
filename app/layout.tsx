import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import MainNavbar from "@/components/main-navbar/navigation-bar";
import { Pixelify_Sans, Heebo } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from "next/head";

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
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			dir="rtl"
			className={`${heebo.variable} ${pixelify.variable}`}
		>
			<Analytics />
			<SpeedInsights />
			<Head>
				<meta property="og:image" content="/preview.png" />
				<meta property="og:image:type" content="image/png" />
				<meta property="og:image:width" content="1901" />
				<meta property="og:image:height" content="1026" />
			</Head>
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					themes={["light", "dark"]}
				>
					<MainNavbar />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
