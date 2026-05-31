// app/notes/filter/@sidebar/default.tsx

import { getListHaircutDays } from "@/lib/api/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import HaircutDaysListClient from "../../../components/ListHaircutdays/HaircutDays.client";
import { HaircutDatePicker } from "@/app/components/HaircutByDate/SearchHaircutByDate";

const HaircutSidebar = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["haircut"],
    queryFn: getListHaircutDays,
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HaircutDaysListClient />
      </HydrationBoundary>
      <HaircutDatePicker />
    </>
  );
};

export default HaircutSidebar;
