import useSWR from "swr";
import {fetcher} from "@/features/common/fetcher";

export function useGraphs() {
  const {data} = useSWR("/api/graphs", fetcher);
  return {
    data: data?.data,
  };
}
