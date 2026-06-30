import css from "./OccultPage.module.css";
type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const OccultLayout = ({ children, sidebar }: Props) => {
  return (
    <section className={css.containerOccult}>
      <aside className={css.asideBar}>{sidebar}</aside>
      <div className={css.containerContent}>{children}</div>
    </section>
  );
};

export default OccultLayout;
