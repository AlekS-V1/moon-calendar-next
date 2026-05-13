"use client";

import Link from "next/link";
import { useState } from "react";
import css from "./Menu.module.css";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <div className={css.menuContainer}>
      <Link href={""} className={css.menuButton} onClick={toggleMenu}>
        Настанови
      </Link>

      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href="/days"
              aria-label="Moon days"
              className={css.linkMenu}
              onClick={toggleMenu}
            >
              Цього дня
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              href="/phasetoday"
              aria-label="Moon phases"
              className={css.linkMenu}
              onClick={toggleMenu}
            >
              Фази
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              href="/todayhaircut"
              aria-label="Haircur today"
              className={css.linkMenu}
              onClick={toggleMenu}
            >
              Стріжки
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Menu;
