import { getListDays, getSingleMoonday } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import MoondayDetailsClient from "./MoondayDetails.client";
import MoonDaysList from "@/app/components/MoonDaysList/MoonDaysList";
import css from "./MoondayDetailsClient.module.css";

interface Props {
  params: Promise<{ id: string }>;
}

const MoonDayDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["moonDay", id],
    queryFn: () => getSingleMoonday(id),
  });

  return (
    <section className={css.sectionMoondayDetails}>
      <MoonDaysList />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MoondayDetailsClient />
      </HydrationBoundary>
    </section>
  );
};

export default MoonDayDetails;
