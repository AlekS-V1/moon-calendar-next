import { HaircutDayInfo } from "@/app/components/HaircutByDate/HaircutByDate";
import Link from "next/link";
import css from "@/app/(other)/haircutdays/[id]/HaircutDayDetail.module.css";

const HaircutdayByDatePage = async () => {
  return (
    <>
      <div className={css.containerGoBack}>
        <Link href={"/haircutdays"} className={css.goBack}>
          <span className={css.back}>&#11178;</span> Повернутися
        </Link>
      </div>
      <HaircutDayInfo />
    </>
  );
};

export default HaircutdayByDatePage;
