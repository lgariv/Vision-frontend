import { ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";

/**
 * Renders a loading component with multiple cards.
 * @returns The loading component.
 */
export default function Loading() {
	return (
		<>
			{[...Array(100)].map((_, i) => (
				// eslint-disable-next-line react/jsx-key
				<Card className="flex flex-col relative border-2 select-none bg-secondary dark:bg-transparent font-heebo" key={`Loading-${i}`}>
					<CardHeader className="flex flex-row justify-between py-2 px-4">
						<CardTitle
							className="font-medium text-2xl mt-1 bg text-transparent bg-muted-foreground animate-pulse opacity-25 rounded-md"
							style={{ animationDelay: `${(i ?? 0) * 0.05}s` }}
						>
							חוות השומר
						</CardTitle>
						<BadgeCheck
							className={`text-transparent ${Math.floor(Math.random() * 4) === 0 ? 'bg-red-400 dark:bg-red-600' : (Math.floor(Math.random() * 4) === 1 ? 'bg-amber-400 dark:bg-amber-600' : (Math.floor(Math.random() * 4) === 2 ? 'bg-green-400 dark:bg-green-600' : 'bg-violet-400 dark:bg-violet-600'))} animate-pulse opacity-25 rounded-md`}
							style={{ animationDelay: `${(i ?? 0) * 0.05}s` }}
						/>
					</CardHeader>
					<CardContent className="grid grid-cols-2 p-2 gap-2">
						{Array.from({ length: 3 }, (_, index) => (
							<Card className="flex flex-col relative border-[1.5px] bg-card dark:bg-secondary/50 shadow-lg" key={`Loading-${i}-${index}`}>
								<CardHeader className="flex flex-row items-center justify-between my-[2px] mx-[4px] p-1 pb-0">
									<CardTitle
										className="font-light text-xs text-transparent bg-muted-foreground animate-pulse opacity-25 rounded-sm scale-y-75"
										style={{ animationDelay: `${(i ?? 0) * 0.05}s` }}
									>
										סקטור 1
									</CardTitle>
								</CardHeader>
								<CardContent className="flex flex-row font-semibold items-center justify-between my-[2px] mx-[4px] p-1 -mt-2">
									<div>
										<p
											className="text-md text-transparent bg-secondary-foreground animate-pulse opacity-25 rounded-sm scale-y-75"
											style={{ animationDelay: `${(i ?? 0) * 0.05}s` }}
										>למעלה</p>
									</div>
									<div
										className={`${Math.round(Math.random()) === 0 ? 'bg-green-400 dark:bg-green-600' : 'bg-red-400 dark:bg-red-600'} text-transparent animate-pulse opacity-25 rounded-sm scale-y-75`}
										style={{ animationDelay: `${(i ?? 0) * 0.05}s` }}
									>
										<ArrowUp
											className="py-1 -mt-[1px] -me-1"
											size={24}
											strokeWidth={3}
										/>
									</div>
								</CardContent>
							</Card>
						))}
					</CardContent>
				</Card>
			))}
		</>
	);
}
