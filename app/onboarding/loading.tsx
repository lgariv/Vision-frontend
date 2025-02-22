"use client";

import { Card, CardHeader, CardBody, Skeleton } from "@nextui-org/react";

export default function OnboardingLoading() {
	return (
		<div className="container mx-auto max-w-4xl p-8 font-heebo flex flex-col items-center justify-center min-h-screen">
			<Skeleton className="h-10 w-48 rounded-md mb-2" />
			<Skeleton className="h-5 w-[600px] mb-8  rounded-sm" />
			{/* Adjusted width for description */}
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				{[1, 2].map((index) => (
					<Card className="py-4" key={index}>
						<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
							<Skeleton className="h-7 w-40 mb-2" />{" "}
							{/* For feature title */}
							<Skeleton className="h-5 w-full mb-4" />{" "}
							{/* For feature description */}
						</CardHeader>
						<CardBody className="overflow-visible py-2 pb-0">
							<Skeleton className="h-[185px] w-[380px] rounded-lg" />{" "}
							{/* Exact image dimensions */}
						</CardBody>
					</Card>
				))}
			</div>
			<div className="mt-8 flex justify-center">
				<Skeleton className="h-10 w-28 rounded-md" />{" "}
				{/* For "בואו נתחיל" button */}
			</div>
		</div>
	);
}
