// components/Header/Header.tsx

import Link from "next/link";
import css from "./Header.module.css";

const Header = () => {
  return (
    <header className={css.header}>
      <h2>Твій місячний календар</h2>
      <nav>
        <ul className={css.navigation}>
          <li>
            <Link href="/" aria-label="Home">
              Головна
            </Link>
          </li>
          <li>
            <Link href="/days" aria-label="Moon days">
              Календар
            </Link>
          </li>
          <li>
            <Link href="/luckyday" aria-label="Lucky Moonday">
              Щасливий день
            </Link>
          </li>
          <li>
            <Link href="/profile" aria-label="Profile">
              Мій Профіль
            </Link>
          </li>
          <li>
            <Link href="/about" aria-label="About">
              Про нас
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
