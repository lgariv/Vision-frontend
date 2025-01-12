"use client";

import { useEffect, useState } from 'react';

import { useSitesStore } from '@/stores/sites-store';
import humanizeDuration from 'humanize-duration';

export default function LastUpdatedFooter() {
    const { sitesData } = useSitesStore();

    const [nowDate, setNowDate] = useState<Date>(new Date());
    const [humanDateFormat, setHumanDateFormat] = useState("");

    useEffect(() => {
        if (sitesData !== undefined) {
            if (sitesData.length <= 0 || !sitesData.find((item) => item.status != "off")) {
                setHumanDateFormat("");
            } else {
                const dateObject = new Date(
					Date.parse(
						sitesData
							.filter((item) => item.status != "off")
							.sort((a, b) => {
								return new Date(b.data.find((item: any) => item.index == "current")?.date!).getTime() - new Date(a.data.find((item: any) => item.index == "current")?.date!).getTime();
							})[0]
							?.data.find((item: any) => item.index == "current")
							?.date!
					)
                );
                dateObject.setFullYear(nowDate.getFullYear());
                dateObject.setMonth(nowDate.getMonth());
                dateObject.setDate(nowDate.getDate() - 1);
                
                let duration = nowDate.getTime() - dateObject.getTime();
                if (duration > 24 * 60 * 60 * 1000) {
                    duration -= 24 * 60 * 60 * 1000;
                }

                setHumanDateFormat(
					humanizeDuration(duration, {
						language: "he",
                        largest: 4,
						round: true,
					})
				);
            }
        }
	}, [sitesData, nowDate]);
    
    useEffect(() => {
        setNowDate(new Date(Date.now()));

        const kiwi = setInterval(() => {
            setNowDate(new Date(Date.now()));
        }, 1000);
        
        return function cleanup() {
            clearInterval(kiwi);
        };
    }, []);

    if (humanDateFormat !== "") return (
		<footer className="text-[16px] md:text-[1.2vw] select-none bottom-0 self-end line-clamp-1 text-muted-foreground sticky max-h-fit md:w-fit w-full flex-shrink-0 p-[0.5vw] bg-gradient-to-tr from-secondary via-transparent to-transparent backdrop-blur-sm text-center md:text-left md:rounded-tr-lg">
			עודכן לאחרונה לפני {humanDateFormat}
		</footer>
	);
}

