// "use client";
// import { useMoonStore } from "@/store/calendarStore";
import { getListHaircutDays } from "@/lib/api/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
// import { useEffect } from "react";
import HaircutDaysListClient from "./HaircutDays.client";
import HaircutByDayClient from "../../components/HaircutByDay/HaircutByDayClient";

const ListHaircutDays = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["haircut"],
    queryFn: getListHaircutDays,
  });

  return (
    <>
      <HaircutByDayClient />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HaircutDaysListClient />
      </HydrationBoundary>
    </>
  );
};

export default ListHaircutDays;
