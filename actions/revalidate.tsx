"use server";

import { revalidateTag } from "next/cache";

export async function revalidateEvetything() {
	revalidateTag("sitesdata");
	revalidateTag("sitelist");
	revalidateTag("alertslist");
}
