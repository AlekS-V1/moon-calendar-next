// components/Header/Header.tsx

import Link from "next/link";
import css from "./Header.module.css";

const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.containerHeader}>
        <h2>Під світлом Місяця</h2>
        <nav>
          <ul className={css.menuHeader}>
            <li className={css.itemMenu}>
              <Link href="/" aria-label="Home" className={css.linkMenu}>
                Головна
              </Link>
            </li>
            <li className={css.itemMenu}>
              <Link
                href="/days"
                aria-label="Moon days"
                className={css.linkMenu}
              >
                Більше
              </Link>
            </li>
            <li className={css.itemMenu}>
              <Link
                href="/luckyday"
                aria-label="Lucky Moonday"
                className={css.linkMenu}
              >
                Щасливий день
              </Link>
            </li>
            {/* <li className={css.itemMenu}>
              <Link
                href="/profile"
                aria-label="Profile"
                className={css.linkMenu}
              >
                Логін
              </Link>
            </li> */}
            <li className={css.itemMenu}>
              <Link href="/about" aria-label="About" className={css.linkMenu}>
                Для чого
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
