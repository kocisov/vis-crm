import useSWR from "swr";
import {fetcher} from "@/features/common/fetcher";

export function useProjects() {
  const {data} = useSWR("/api/projects/me", fetcher);
  return {
    data: data?.data,
  };
}
