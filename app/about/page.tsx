import { cn } from "@/lib/utils";
import DotPattern from "@/components/ui/dot-pattern";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { Button } from "@nextui-org/react";
import { Github, Linkedin } from "lucide-react";
import Image from "next/image";
import MainNavbar from "@/components/main-navbar/navigation-bar";

type Props = {};

const AboutPage = (props: Props) => {
	return (
		<>
			<MainNavbar />
			<main className="font-heebo overscroll-y-none z-1" dir="rtl">
				<DotPattern
					className={cn(
						"[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
					)}
				/>
				<div className="relative flex md:min-h-screen lg:min-h-screen flex-col items-center justify-center p-4 -mt-16 pt-20">
					<NeonGradientCard className="max-w-2xl z-10">
						<div className="flex items-center justify-between mb-4">
							<div>
								<h1 className="text-4xl md:text-5xl font-bold text-foreground -my-2">
									אודות{" "}
									<span className="font-pixelify">
										VISION
									</span>
								</h1>
								<h2 className="text-lg md:text-xl text-foreground/75 mt-2">
									פותח על ידי{" "}
									<a
										href="https://www.linkedin.com/in/lavie-g-3a66a21ba/"
										target="_blank"
										rel="noopener noreferrer"
										className="hover:underline"
									>
										לביא גריב
									</a>
								</h2>
							</div>
							<Image
								src="https://media.licdn.com/dms/image/v2/D4E03AQHA8OANx3jqDQ/profile-displayphoto-shrink_800_800/B4EZOvY7Z3HEAc-/0/1733814368868?e=1740614400&amp;v=beta&amp;t=5b5Wk0y8iXWTHqmOcdOUx9ygzW0k-DVeeAQHkrcvQJ4"
								alt="Vision Creator"
								className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
								width={128}
								height={128}
							/>
						</div>
						<div>
							<p className="mb-6 text-lg text-foreground text-pretty">
								Vision היא אפליקציית web לניטור וניהול מערכות
								תקשורת סלולריות מסוג eNodeB. הפרויקט פותח עם{" "}
								<strong>Next.js 14</strong> ו-
								<strong>Express</strong>, תוך שימוש ב-
								<strong>NextUI</strong> לרכיבי UI מותאמים
								ונגישים וב-<strong>Tailwind CSS</strong> לעיצוב
								רספונסיבי ומודרני. האפליקציה מתבססת על{" "}
								<strong>Zustand</strong> לניהול states בצורה
								פשוטה, וכן <strong>Leaflet</strong> להצגת מפות
								אינטראקטיביות. המערכת מאפשרת מעקב בזמן אמת אחרי
								נתונים חשובים כמו כמות מכשירים פעילים, התראות
								והפרעות תדרים. המידע מוצג בצורה נוחה ונגישה
								למשתמש, דרך לוח בקרה או תצוגת מפה. המערכת מבוססת
								על טכנולוגיות מתקדמות שמאפשרות ניטור מדויק,
								ויזואליזציה של נתונים בזמן אמת וארכיטקטורה גמישה
								ופשוטה לתחזוקה.
							</p>

							<hr className="my-4 border-foreground/10 border-t-[2.5px] rounded-lg" />

							<p className="text-lg text-foreground font-bold">
								הפרויקט נפרס על תשתית ענן מתקדמת הכוללת:
							</p>
							<ul className="mb-6 text-lg text-foreground list-disc list-inside">
								<li>
									<strong>Render.com</strong>: מנהלת את
									ה-Backend ביעילות, עם תמיכה בעומסים משתנים
									ויכולת פריסה מהירה.
								</li>
								<li>
									<strong>Supabase</strong>: מסד נתונים מבוסס{" "}
									<strong>PostgreSQL</strong> שמבטיח אחסון
									וניהול מידע פשוט ומהיר בצורה מאובטחת.
								</li>
								<li>
									<strong>Vercel</strong>: אחראית לפריסת
									ה-Frontend, תוך שימוש ברשת CDN שמאפשרת טעינה
									מהירה וחוויית משתמש מיטבית בכל מקום בעולם.
								</li>
							</ul>

							<hr className="my-4 border-foreground/10 border-t-[2.5px] rounded-lg" />

							<p className="mb-6 text-lg text-foreground">
								השילוב בין הטכנולוגיות האלו יוצר מערכת יציבה,
								נוחה וסקיילבילית, המספקת פתרון יעיל לניהול
								מערכות תקשורת סלולריות ברשת LTE.
							</p>
						</div>
						<div className="grid grid-cols-2 md:flex gap-4 w-full">
							<Button
								as="a"
								href="https://github.com/lgariv/Vision-frontend"
								startContent={<Github />}
								className="font-bold font-sans border-2 dark:border-0 border-[#333]"
								style={{
									backgroundColor: "#eee",
									color: "#333",
								}}
								target="_blank"
								rel="noopener noreferrer"
							>
								צפה ב-GitHub
							</Button>
							<Button
								as="a"
								href="https://www.linkedin.com/in/lavie-gariv/"
								startContent={<Linkedin />}
								className="font-bold font-sans"
								style={{
									backgroundColor: "#0077B5",
									color: "#fff",
								}}
								target="_blank"
								rel="noopener noreferrer"
							>
								LinkedIn
							</Button>
						</div>
					</NeonGradientCard>
				</div>
			</main>
		</>
	);
};

export default AboutPage;
