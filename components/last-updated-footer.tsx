"use client";

import { useEffect, useState } from 'react';

import { useSitesStore } from '@/stores/sites-store';
import humanizeDuration from 'humanize-duration';

export default function LastUpdatedFooter() {
    const { sitesData } = useSitesStore();

    const [nowDate, setNowDate] = useState("");
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
                setHumanDateFormat(
                    humanizeDuration(Number(dateObject) - Number(nowDate), { // Convert dateObject and nowDate to numbers
                        language: "he",
                        largest: 2,
                    })
                );
            }
        }
	}, [sitesData, nowDate]);
    
    useEffect(() => {
        setNowDate(Date.now().toString().slice(0, -3) + "000");

        const kiwi = setInterval(() => {
            setNowDate(Date.now().toString().slice(0, -3) + "000");
        }, 1000);
        
        return function cleanup() {
            clearInterval(kiwi);
        };
    }, []);

    if (humanDateFormat !== "") return (
        <footer className="text-[1.2vw] select-none bottom-0 self-end line-clamp-1 text-muted-foreground sticky max-h-fit w-fit flex-shrink-0 p-[0.5vw] bg-gradient-to-tr from-secondary via-transparent to-transparent backdrop-blur-sm text-left rounded-tr-lg">
            עודכן לאחרונה לפני {humanDateFormat}
        </footer>
	);
}

