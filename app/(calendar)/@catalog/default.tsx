import { DaysTitlesList } from "@/app/components/DaysTitleList/DaysTitleList.client";
import css from "./Catalog.module.css";

const CatalogMoondays = async () => {
  return (
    <div className={css.sectionCatalog}>
      <DaysTitlesList />
    </div>
  );
};

export default CatalogMoondays;
