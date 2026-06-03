import PhaseTodayClient from "../../../components/PhaseToday/PhaseToday.client";
import css from "./PhaseTodayPage.module.css";

const PhaseTodayPage = async () => {
  return (
    <section className={css.pageSectionPhases}>
      <PhaseTodayClient />
    </section>
  );
};
export default PhaseTodayPage;
