// app/about/page.tsx

import ShortAbout from "@/app/components/AboutPage/ShortAbout";
import css from "./AboutPage.module.css";

const About = () => {
  return (
    <div className={css.containerAbout}>
      <ShortAbout />
    </div>
  );
};

export default About;
