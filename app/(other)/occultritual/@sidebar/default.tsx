import OccultDaysListClient from "@/app/components/OccultDaysList/OccultDaysList.client";
import { getListOccultDays } from "@/lib/api/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const OccultSidebar = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["occultdays"],
    queryFn: getListOccultDays,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OccultDaysListClient />
    </HydrationBoundary>
  );
};

export default OccultSidebar;
