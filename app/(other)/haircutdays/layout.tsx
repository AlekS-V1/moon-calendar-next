import css from "./HaircutPage.module.css";
type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const HaircutLayout = ({ children, sidebar }: Props) => {
  return (
    // <section className={css.sectionHaircut}>
    <section className={css.containerHaircut}>
      <aside className={css.asideBar}>{sidebar}</aside>
      <div className={css.containerContent}>{children}</div>
    </section>
  );
};

export default HaircutLayout;
