// app/notes/filter/@sidebar/default.tsx

import { getListHaircutDays } from "@/lib/api/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import css from "../HaircutPage.module.css";
import HaircutDaysListClient from "../HaircutDays.client";

const HaircutSidebar = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["haircut"],
    queryFn: getListHaircutDays,
  });
  return (
    // <div className={css.containerHaircut}>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HaircutDaysListClient />
    </HydrationBoundary>
    // </div>
  );
};

export default HaircutSidebar;
