import TodayMoonday from "@/app/components/TodayMoonday/TodayMoonday";
import css from "./Moondays.module.css";

const MoondayTodayPage = async () => {
  return (
    <section className={css.sectionTodayMoonday}>
      <TodayMoonday />
    </section>
  );
};

export default MoondayTodayPage;
