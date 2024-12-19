// force-dynamic
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_IP}/getLastResults`, { // previously /sites
		next: {
			revalidate: 30,
			tags: ["sitesdata"]
		},
		// cache: "no-store",
	});
	const rawData = await response.json();
	const data = rawData?.filter((site: any) => site.isInUse);
	return NextResponse.json(data, { status: 200 });
}
