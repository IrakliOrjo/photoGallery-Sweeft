import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface Data {
  id: number;
  name: string;
  results?: object[];
  urls?: string;
  data?: {
    pages: {
      results: [];
    };
  };
}
//fetch
const fetchData = async ({ pageParam }: { pageParam: number }) => {
  return await axios.get<Data[]>(
    `https://api.unsplash.com/photos/?client_id=c7ES65ONIS2Rt61OPCjkpl_auO6HJs9eY2Jb9DilR5I&page=${pageParam}&per_page=20&order_by=popular`
  );
};

//query function
export function useFetchMain() {
  return useInfiniteQuery({
    queryKey: ["main"],
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      // @ts-ignore
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_, __, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });
}
