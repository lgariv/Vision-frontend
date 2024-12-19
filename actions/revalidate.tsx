"use server";

import { revalidateTag } from "next/cache";

export async function revalidateEvetything() {
	revalidateTag("sitelist");
	revalidateTag("sitesdata");
}
