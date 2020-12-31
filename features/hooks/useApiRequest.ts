import useSWR from "swr";
import {fetcher} from "@/features/common/fetcher";

export function useApiRequest(url: string, conditional = true) {
  const {data} = useSWR(conditional ? url : null, fetcher);
  return {
    data: data?.data,
  };
}
