"use client";

import { usePreferencesStore } from "@/stores/preferences-store";
import { Image, Button, Card, CardHeader, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export const dynamic = "force-static";

const features = [
	{
		title: "לוח מחוונים",
		description: "תצוגה של סטטיסטיקות ומדדים קריטיים על מצב האתרים",
		image: "/features/dashboard.png",
	},
	{
		title: "מפה אינטראקטיבית",
		description: "תצוגת מפה שמציגה סטטוס אתרים בצורה ויזואלית וברורה",
		image: "/features/map.png",
	},
];

export default function OnboardingPage() {
	const router = useRouter();
	const { isOnboarded, setOnboarded } = usePreferencesStore();

	const handleComplete = async () => {
        setOnboarded(true);
        router.push("/");
	};

	return (
		<div className="container mx-auto max-w-4xl p-8 font-heebo flex flex-col items-center justify-center min-h-screen">
			<div className="flex items-center justify-center gap-3 text-2xl font-bold">
				<span className="text-3xl">ברוכים הבאים למערכת</span>
				<span className="text-4xl font-bold text-primary font-pixelify">
					VISION
				</span>
			</div>
			<p className="mb-8 text-center text-gray-500 dark:text-gray-400">
				גלה את התכונות שיעזרו לך לנטר את רשת הסלולר שלך בצורה יעילה
				יותר
			</p>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				{features.map((feature, index) => (
					<Card className="py-4" key={index}>
						<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
							<h3 className="mb-2 text-lg font-semibold">
								{feature.title}
							</h3>
							<p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
								{feature.description}
							</p>
						</CardHeader>
						<CardBody className="overflow-visible py-2 pb-0">
							<Image
								src={feature.image}
								alt={feature.title}
								height={185}
								width={380}
								className="object-cover rounded-lg"
							/>
						</CardBody>
					</Card>
				))}
			</div>

			<div className="mt-8">
				<div className="flex justify-center">
					<Button
						className="text-md font-bold rounded-md"
						color="primary"
						onPress={handleComplete}
					>
						בואו נתחיל
					</Button>
				</div>
			</div>
		</div>
	);
}
