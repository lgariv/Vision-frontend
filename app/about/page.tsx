import { cn } from "@/lib/utils";
import DotPattern from "@/components/ui/dot-pattern";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { Button } from "@nextui-org/react";
import { Github, Linkedin } from "lucide-react";
type Props = {};

const AboutPage = (props: Props) => {
    return (
		<main className="font-heebo overscroll-y-none z-1" dir="rtl">
			<DotPattern
				className={cn(
					"[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
				)}
			/>
			<div className="relative flex md:min-h-screen lg:min-h-screen flex-col items-center justify-center p-4 -mt-16 pt-20">
				<NeonGradientCard className="max-w-2xl">
					<h1 className="mb-4 text-4xl font-bold text-white">
						אודות Vision
					</h1>
					<div>
						<p className="mb-6 text-lg text-gray-200">
							אפליקציית web לניטור וניהול מערכות תקשורת סלולריות
							מסוג eNodeB. הפרויקט פותח עם{" "}
							<strong>Next.js 14</strong> ו-
							<strong>Express</strong>, ומאפשר מעקב בזמן אמת אחרי
							נתונים חשובים כמו כמות מכשירים פעילים, התראות
							והפרעות תדרים. המידע מוצג בצורה נוחה ונגישה למשתמש,
							דרך לוח בקרה או תצוגת מפה. המערכת מבוססת על
							טכנולוגיות מתקדמות שמאפשרות ניטור מדויק, ויזואליזציה
							של נתונים בזמן אמת וארכיטקטורה סקיילבילית.
						</p>

						<ul className="mb-6 text-lg text-gray-200 list-disc list-inside">
							<li>
								<strong>Render.com</strong>: מנהלת את ה-Backend
								ביעילות, עם תמיכה בעומסים משתנים ויכולת פריסה
								מהירה.
							</li>
							<li>
								<strong>Supabase</strong>: מסד נתונים מבוסס{" "}
								<strong>PostgreSQL</strong> שמבטיח אחסון וניהול
								מידע פשוט ומהיר, עם API שמתממשק בצורה חלקה
								לשירותים אחרים.
							</li>
							<li>
								<strong>Vercel</strong>: אחראית לפריסת
								ה-Frontend, תוך שימוש ברשת Edge שמאפשרת טעינה
								מהירה וחוויית משתמש מיטבית בכל מקום בעולם.
							</li>
						</ul>

						<p className="mb-6 text-lg text-gray-200">
							החיבור בין הטכנולוגיות האלו יוצר פתרון חכם וחדשני
							לניהול מערכות תקשורת סלולריות, שתוכנן לספק ביצועים
							מצוינים ומענה פשוט גם לאתגרים מורכבים.
						</p>
					</div>
					<div className="flex flex-row space-x-4">
						<Button
							as="a"
							href="https://github.com/lgariv/Vision-frontend"
							target="_blank"
							startContent={<Github />}
							className="me-4 font-bold font-sans"
							style={{
								backgroundColor: "#eee",
								color: "#333",
								borderColor: "#333",
								borderWidth: "1px",
							}}
						>
							צפה ב-GitHub
						</Button>
						<Button
							as="a"
							href="https://www.linkedin.com/in/lavie-g-3a66a21ba/"
							target="_blank"
							startContent={<Linkedin />}
							className="font-bold font-sans"
							style={{
								backgroundColor: "#0077B5",
								color: "#fff",
							}}
						>
							LinkedIn
						</Button>
					</div>
				</NeonGradientCard>
			</div>
		</main>
	);
};

export default AboutPage;
