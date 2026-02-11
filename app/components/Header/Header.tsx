// components/Header/Header.tsx

import Link from "next/link";
import css from "./Header.module.css";

const Header = () => {
  return (
    <header className={css.header}>
      <h2>Moon Calendar</h2>
      <nav>
        <ul className={css.navigation}>
          <li>
            <Link href="/" aria-label="Home">
              Home
            </Link>
          </li>
          <li>
            <Link href="/days" aria-label="Moon days">
              Moon days
            </Link>
          </li>
          <li>
            <Link href="/profile" aria-label="Profile">
              Profile
            </Link>
          </li>
          <li>
            <Link href="/about" aria-label="About">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
