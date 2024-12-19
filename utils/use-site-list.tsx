import useSWR from "swr";

const fetcher = async (url: string) => await fetch(url).then((res) => res.json());

export function useSiteList() {
    return useSWR("/api/site-list", fetcher, {
        refreshInterval: 300000,
        revalidateIfStale: true,
        revalidateOnMount: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
    });
}