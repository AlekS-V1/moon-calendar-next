// app/haircutdays/[id]/page.tsx

import { getSingleHaircutDay } from "@/lib/api/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import HaircutDayDetailsClient from "./HaircutDayDetail.client";

interface Props {
  params: Promise<{ id: string }>;
}

const HaircutDayPage = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["haircutDay", id],
    queryFn: () => getSingleHaircutDay(id),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HaircutDayDetailsClient id={id} />
      </HydrationBoundary>
    </>
  );
};

export default HaircutDayPage;
