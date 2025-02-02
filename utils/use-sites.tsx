import useSWR from "swr";

const fetcher = async (url: string) => await fetch(url).then((res) => res.json());

export function useSites() {
    return useSWR("/api/sites-data", fetcher, {
        refreshInterval: 30000,
        revalidateIfStale: true,
        revalidateOnMount: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        refreshWhenHidden: true,
        refreshWhenOffline: true,
        // suspense: true,
    });
}