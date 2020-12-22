import useSWR from "swr";
import {fetcher} from "@/features/common/fetcher";

export function useDashboard() {
  const {data} = useSWR("/api/dashboard", fetcher);
  return {
    data: data?.data,
  };
}
