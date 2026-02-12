import { getSingleMoonday } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import MoondayDetailsClient from "./MoondayDetails.client";

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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MoondayDetailsClient />
    </HydrationBoundary>
  );
};

export default MoonDayDetails;
