import { getMoondayList } from "@/lib/api/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import MoondaysListClient from "./DaysList.client";
import { DaysTitlesList } from "../components/DaysTitleList/DaysTitleList.client";
import { DatePicker } from "../components/DayByDate/SearchByDate";
import { MoonDayInfo } from "../components/DayByDate/DayByDate";

const NotesPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["days"],
    queryFn: getMoondayList,
  });

  return (
    <>
      <DaysTitlesList />
      <DatePicker />
      <MoonDayInfo />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MoondaysListClient />
      </HydrationBoundary>
    </>
  );
};

export default NotesPage;
