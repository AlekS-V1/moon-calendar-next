import RitualMeditationTodayClient from "@/app/components/MeditationRitualToday/MeditationRitualToday.client";
import css from "./MeditationTodayPage.module.css";

const RitualMeditationTodayPage = () => {
  return (
    <section className={css.pageSectionMeditation}>
      <RitualMeditationTodayClient />
    </section>
  );
};

export default RitualMeditationTodayPage;
