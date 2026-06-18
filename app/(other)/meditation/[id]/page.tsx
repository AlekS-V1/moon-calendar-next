// app/haircutdays/[id]/page.tsx

import { getSingleHaircutDay, getSingleMeditationDay } from "@/lib/api/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import css from "./PageMeditationDetails.module.css";
import MeditationDayDetailsClient from "../../../components/MeditationDayDetail/MeditationDayDetail.client";

interface Props {
  params: Promise<{ id: string }>;
}

const MeditationDayPage = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["meditationDay", id],
    queryFn: () => getSingleMeditationDay(id),
  });

  console.log("MeditationDayPage", id);
  return (
    <section className={css.pageSectionMeditationDetails}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MeditationDayDetailsClient id={id} />
      </HydrationBoundary>
    </section>
  );
};

export default MeditationDayPage;
