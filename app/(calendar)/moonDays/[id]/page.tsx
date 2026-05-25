// app/moonDays/[id]/page.tsx

import { getMoondaySingle } from "@/lib/api/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import MoondayDetailsClient from "./DayDetail.client";
import { DaysTitlesList } from "@/app/components/DaysTitleList/DaysTitleList.client";

interface Props {
  params: Promise<{ id: string }>;
}

const MoondayPage = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  // 1. Попередньо завантажуємо дані в серверний кеш TanStack Query
  await queryClient.prefetchQuery({
    queryKey: ["day", id],
    queryFn: () => getMoondaySingle(id),
  });
  // 2. "Заморожуємо" кеш за допомогою deactivate(dehydrate) і передаємо  його клієнту

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MoondayDetailsClient id={id} />
      </HydrationBoundary>
    </>
  );
};

export default MoondayPage;
