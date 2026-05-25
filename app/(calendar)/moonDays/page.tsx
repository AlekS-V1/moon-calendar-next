import { getMoondayList } from "@/lib/api/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import MoondaysListClient from "./DaysList.client";
import { DatePicker } from "../../components/DayByDate/SearchByDate";
import { MoonDayInfo } from "../../components/DayByDate/DayByDate";

const CalendarPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["days"],
    queryFn: getMoondayList,
  });

  return (
    <>
      <DatePicker />
      <MoonDayInfo />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MoondaysListClient />
      </HydrationBoundary>
    </>
  );
};

export default CalendarPage;
