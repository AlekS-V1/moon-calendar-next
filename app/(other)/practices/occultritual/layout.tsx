import css from "./OccultPage.module.css";
type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const OccultLayout = ({ children, sidebar }: Props) => {
  return (
    <section className={css.containerOccult}>
      <div className={css.containerContent}>{children}</div>
      <aside className={css.asideBar}>{sidebar}</aside>
    </section>
  );
};

export default OccultLayout;
