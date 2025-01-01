// force-dynamic
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase URL or Key");
}
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
    const body = await request.json();
    if (!body.password) {
		return NextResponse.json(
			{ error: "Password is required" },
			{ status: 400 }
		);
	}
    const { data, error } = await supabase.auth.signInWithPassword({
		email: "admin@admin.com",
		password: body.password,
	});
    const { user, session } = data;
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json({ user, session }, { status: 200 });
}
