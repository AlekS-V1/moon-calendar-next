import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import HaircutDayByIDClient from "./HaircutDayById.client";
import { getSingleHaircutDay } from "@/lib/api";

interface Props {
  params: Promise<{ id: string }>;
}
const HaircutDayByID = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["haircutDay", id],
    queryFn: () => getSingleHaircutDay(id),
  });

  return (
    <section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HaircutDayByIDClient />
      </HydrationBoundary>
    </section>
  );
};

export default HaircutDayByID;
