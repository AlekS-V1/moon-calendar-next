// app/days/page.tsx
import { getListDays } from "@/lib/api";

const Days = async () => {
  const days = await getListDays();
  console.log("Moondays", days);
  return <div>MoonMonth</div>;
};

export default Days;
