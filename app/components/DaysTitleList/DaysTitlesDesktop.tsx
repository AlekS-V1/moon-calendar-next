// DaysTitlesDesktop.tsx
import Link from "next/link";
import css from "./MoonDayItem.module.css";

interface DesktopProps {
  sortedTitles: any[];
  activeIndex: number;
  moonImages32: Record<number, string>;
}

export default function DaysTitlesDesktop({
  sortedTitles,
  activeIndex,
  moonImages32,
}: DesktopProps) {
  return (
    <div className={css.desktopWrapper}>
      <ul className={css.daysGrid}>
        {sortedTitles.map((day, index) => {
          const imageClass = css[`day_${day.dayNumber}`] || "";
          const isActive = index === activeIndex;

          return (
            <li key={day._id}>
              <Link
                href={`/moonDays/${day._id}`}
                className={`${css.moonIcon} ${imageClass} ${isActive ? css.activeDay : ""}`}
                style={{
                  backgroundImage: `url(${moonImages32[day.dayNumber]})`,
                }}
              >
                <span className={css.dayStyle}>{day.dayNumber}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
