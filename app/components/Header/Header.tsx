// components/Header/Header.tsx
"use client";

import Link from "next/link";
import css from "./Header.module.css";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className={css.header}>
      <div className={css.containerHeader}>
        <h2 className={css.logo}>Під світлом Місяця</h2>

        {/* Десктоп меню */}
        <nav className={css.desktopNav}>
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

        {/* Бургер */}
        <button
          className={`${css.burger} ${open ? css.open : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>

        {/* Затемнення фону */}
        <div className={`${css.overlay} ${open ? css.show : ""}`} />

        {/* Мобільне меню */}
        <nav className={`${css.mobileNav} ${open ? css.show : ""}`}>
          <ul>
            <li>
              <Link href="/" onClick={() => setOpen(false)}>
                Головна
              </Link>
            </li>
            <li>
              <Link href="/days" onClick={() => setOpen(false)}>
                Більше
              </Link>
            </li>
            <li>
              <Link href="/luckyday" onClick={() => setOpen(false)}>
                Щасливий день
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
