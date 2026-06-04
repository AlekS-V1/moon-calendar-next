// app/about/page.tsx

import ShortAbout from "@/app/components/AboutPage/ShortAbout";
import css from "./AboutPage.module.css";
import FullAbout from "@/app/components/AboutPage/FullAbout";

const About = () => {
  return (
    <div className={css.containerAbout}>
      <ShortAbout />
      <FullAbout />
    </div>
  );
};

export default About;
