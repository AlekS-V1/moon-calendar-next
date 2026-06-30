// "use client";
// import { useMoonStore } from "@/store/calendarStore";
import { getListHaircutDays } from "@/lib/api/api";
import {} from // dehydrate,
// HydrationBoundary,
// QueryClient,
"@tanstack/react-query";
// import { useEffect } from "react";
// import HaircutDaysListClient from "../../components/ListHaircutdays/HaircutDays.client";
// import HaircutByDayClient from "../../components/HaircutByDay/HaircutByDayClient";
import HaircutTodayClient from "./today/HaircutToday.client";
// import css from "./HaircutPage.module.css";

const ListHaircutDays = async () => {
  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ["haircut"],
  //   queryFn: getListHaircutDays,
  // });

  return <HaircutTodayClient />;
  // <section className={css.sectionHaircut}>

  // </section>
};

export default ListHaircutDays;
