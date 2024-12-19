"use server";

import { revalidateTag } from "next/cache";

export async function submitNewSite(state: any, formData: FormData) {
	const dictBody = Object.fromEntries(formData.entries() as any);
	dictBody.isPortable = dictBody.isPortable === "נייד";
	dictBody.defaultLocation = `${dictBody.longitude},${dictBody.latitude}`;
	delete dictBody.longitude;
	delete dictBody.latitude;

	const rawBody = JSON.stringify(dictBody);

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	const requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: rawBody,
	};

	const result = await fetch(
		`${process.env.NEXT_PUBLIC_API_IP}/sites_management/`,
		requestOptions
	); // previously /createsite

	revalidateTag("sitelist");

	return await result.json();
}

export async function deleteSite(state: any, formData: FormData) {
	const rawBody = JSON.stringify(Object.fromEntries(formData.entries()));

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	const requestOptions = {
		method: "DELETE",
		headers: myHeaders,
		body: rawBody,
	};

	const result = await fetch(`${process.env.NEXT_PUBLIC_API_IP}/sites_management/`, requestOptions); // previously /deletesite

	revalidateTag("sitelist");

	return await result.json();
}

export async function submitNewAlert(state: any, formData: FormData) {
	const dictBody = Object.fromEntries(formData.entries() as any);

	const rawBody = JSON.stringify(dictBody);

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	const requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: rawBody,
	};

	const result = await fetch(
		`${process.env.NEXT_PUBLIC_API_IP}/allowed_alerts/`,
		requestOptions
	);

	revalidateTag("alertslist");

	const data = await result.json();
	return data;
}

export async function updateAlert(state: any, formData: FormData) {
	const dictBody = Object.fromEntries(formData.entries() as any);
	dictBody.id = Number(dictBody.id);

	const rawBody = JSON.stringify(dictBody);

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	const requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: rawBody,
	};

	const result = await fetch(
		`${process.env.NEXT_PUBLIC_API_IP}/allowed_alerts/`,
		requestOptions
	);

	revalidateTag("alertslist");

	const data = await result.json();
	return data;
}

export async function deleteAlert(state: any, formData: FormData) {
	const dictBody = Object.fromEntries(formData.entries() as any);
	console.log(`dictBody delete :: ${JSON.stringify(dictBody)}`);
	if (JSON.stringify(dictBody).includes(","))
		dictBody.allowedAlertId = dictBody.allowedAlertId.split(",").map((i: string) => Number(i));
	else
		dictBody.allowedAlertId = [Number(dictBody.allowedAlertId)];

	const rawBody = JSON.stringify(dictBody);
	console.log(`rawBody delete :: ${rawBody}`);

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	const requestOptions = {
		method: "DELETE",
		headers: myHeaders,
		body: rawBody,
	};

	const result = await fetch(
		`${process.env.NEXT_PUBLIC_API_IP}/allowed_alerts/`,
		requestOptions
	);

	revalidateTag("alertslist");

	const data = await result.json();
	return data;
}

// export async function addSiteLocation(state: any, formData: FormData) {
// 	const rawBody = JSON.stringify(Object.fromEntries(formData.entries()));

// 	console.log(rawBody)

// 	const myHeaders = new Headers();
// 	myHeaders.append("Content-Type", "application/json");

// 	const requestOptions = {
// 		method: "DELETE",
// 		headers: myHeaders,
// 		body: rawBody,
// 	};

// 	const result = await fetch(
// 		`${process.env.NEXT_PUBLIC_API_IP}/deletesite`,
// 		requestOptions
// 	);

// 	revalidateTag("sitesdata");

// 	return await result.json();
// }
