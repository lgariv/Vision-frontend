// force-dynamic
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    if (!body.password) {
		return NextResponse.json(
			{ error: "Password is required" },
			{ status: 400 }
		);
	}
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_IP}/authenticate`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ password: body.password }),
			cache: "no-store",
		},
	);

	const result = await response.json();
	return NextResponse.json(result, { status: response.status });
}
