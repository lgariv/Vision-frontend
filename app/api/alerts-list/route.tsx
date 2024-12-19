// force-dynamic
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_IP}/allowed_alerts`, {
		next: {
			revalidate: 300,
			tags: ["alertslist"]
		},
		// cache: "no-store",
	});
	const data = await response.json();
	return NextResponse.json(data, { status: 200 });
}
