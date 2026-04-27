import { MoonSearchByData } from "../components/MoonSearchByData/MoonSearchByData";
import { MoonSearchResultView } from "../components/MoonSearchResultByData/MoonSearchResultByData";
import css from "./SearchResultPage.module.css";

export default function SearchResultPage() {
  return (
    <section className={css.sectionSearchRsult}>
      {/* <MoonSearchByData /> */}
      <MoonSearchResultView />
    </section>
  );
}
