// app/(other)/occultritual/[id]/page.tsx

import { getSingleOccultDay } from "@/lib/api/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import OccultDayDetailsClient from "./OccultDayDetails.client";

interface Props {
  params: Promise<{ id: string }>;
}

const OccultDayPage = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["occultDay", id],
    queryFn: () => getSingleOccultDay(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OccultDayDetailsClient id={id} />
    </HydrationBoundary>
  );
};

export default OccultDayPage;
