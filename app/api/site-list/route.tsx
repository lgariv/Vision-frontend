// force-dynamic
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_IP}/sites_management`, { // previously /sitelist
		next: {
			revalidate: 300,
			tags: ["sitelist"]
		},
		// cache: "no-store",
	});
	const data = await response.json();
	const siteData = data.data.filter((site: any) => site.isInUse);
	return NextResponse.json(siteData, { status: 200 });
}
