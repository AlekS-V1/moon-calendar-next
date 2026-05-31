import { HaircutDatePicker } from "@/app/components/HaircutByDate/SearchHaircutByDate";
import HaircutTodayClient from "./HaircutToday.client";
import { HaircutDayInfo } from "@/app/components/HaircutByDate/HaircutByDate";

const HaircutTodayPage = async () => {
  return (
    <section>
      <HaircutTodayClient />
      <HaircutDatePicker />
      <HaircutDayInfo />
    </section>
  );
};

export default HaircutTodayPage;
