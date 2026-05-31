// components/Header/Header.tsx
"use client";

import Link from "next/link";
import css from "./Header.module.css";
import { useState } from "react";
import Menu from "../DesktopMenu/Menu";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setOpen(false);
  const toggleUnderMenu = () => {
    setIsOpen(!isOpen);
    setOpen(false);
  };
  return (
    <header className={css.header}>
      <div className={css.containerHeader}>
        <Link href="/" aria-label="Home">
          <h2 className={css.logo}>Під світлом Місяця</h2>
        </Link>

        {/* Десктоп меню */}
        <nav className={css.desktopNav}>
          <ul className={css.menuHeader}>
            <li className={css.itemMenu}>
              <Link href="/" aria-label="Home" className={css.linkMenu}>
                Сьогодні
              </Link>
            </li>
            <li>
              <Menu />
              {/* <Link
                href="/days"
                aria-label="Moon days"
                className={css.linkMenu}
              >
                Настанови
              </Link> */}
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
          <span className={css.burgerButton} />
          <span className={css.burgerButton} />
          <span className={css.burgerButton} />
        </button>

        {/* Затемнення фону */}
        <div
          onClick={toggleMenu}
          className={`${css.overlay} ${open ? css.show : ""}`}
        />

        {/* Мобільне меню */}
        <nav className={`${css.mobileNav} ${open ? css.show : ""}`}>
          <ul className={css.menuHeaderMobile}>
            <li className={css.itemMenuMobile}>
              <Link className={css.linkMenu} href="/" onClick={toggleMenu}>
                Сьогодні
              </Link>
            </li>
            <li className={css.itemMenuMobile}>
              <Link
                className={css.linkMenu}
                href={""}
                onClick={() => setIsOpen(!isOpen)}
              >
                Настанови
              </Link>

              {isOpen && (
                <ul className={css.menuList}>
                  <li className={css.underMenuItem}>
                    <Link
                      href="/recommendation"
                      aria-label="Moon days"
                      className={css.linkMenu}
                      onClick={toggleUnderMenu}
                    >
                      Цього дня
                    </Link>
                  </li>
                  <li className={css.underMenuItem}>
                    <Link
                      href="/phases/today"
                      aria-label="Moon phases"
                      className={css.linkMenu}
                      onClick={toggleUnderMenu}
                    >
                      Фази
                    </Link>
                  </li>
                  <li className={css.underMenuItem}>
                    <Link
                      href="/haircutdays"
                      aria-label="Haircur today"
                      className={css.linkMenu}
                      onClick={toggleUnderMenu}
                    >
                      Стріжки
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className={css.itemMenuMobile}>
              <Link
                className={css.linkMenu}
                href="/luckyday"
                onClick={() => setOpen(false)}
              >
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
