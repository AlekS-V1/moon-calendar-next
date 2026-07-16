"use client";

import Link from "next/link";
import css from "./layoutPractices.module.css";
import { useParams, usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
  //   sidebar: React.ReactNode;
};
const LayoutPractices = ({ children }: Props) => {
  const { id } = useParams();
  const path = usePathname();

  const tabs = [
    {
      name: "Медитації",
      href: "/practices/meditation/today",
      aliases: "/practices/meditation",
    },
    {
      name: "Окультні практики",
      href: "/practices/occultritual/today",
      aliases: `/practices/occultritual/${id}`,
    },
  ];
  return (
    <div className={css.practicesContainer}>
      <nav className={css.navTitle}>
        <div className={css.buttonTitle}>
          {tabs.map((tab) => {
            const aliasesArray = tab.aliases
              ? Array.isArray(tab.aliases)
                ? tab.aliases
                : [tab.aliases]
              : [];

            const allPaths = [tab.href, ...aliasesArray];
            const isActive = allPaths.some((p) => {
              if (p.includes("undefined")) return false;
              return path.startsWith(p);
            });
            return (
              <Link
                key={tab.href}
                className={`${css.linkButtonTitle} ${isActive ? css.enableButtonTitle : css.disableButtonTitle}`}
                href={tab.href}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className={css.practicesContent}>{children}</div>
    </div>
  );
};

export default LayoutPractices;
