// app/haircutdays/[id]/page.tsx

import { getSingleHaircutDay } from "@/lib/api/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import HaircutDayDetailsClient from "./HaircutDayDetail.client";
import Link from "next/link";
import css from "./HaircutDayDetailClient.module.css";

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
      <div className={css.containerGoBack}>
        <Link href={"/haircutdays"} className={css.goBack}>
          <span className={css.back}>&#11178;</span> Повернутися
        </Link>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HaircutDayDetailsClient id={id} />
      </HydrationBoundary>
    </>
  );
};

export default HaircutDayPage;
