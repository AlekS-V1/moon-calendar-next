"use client";

import Link from "next/link";
import { useState } from "react";
import css from "./Menu.module.css";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isUnderOpen) setUnderIsOpen(false);
  };
  const [isUnderOpen, setUnderIsOpen] = useState(false);
  const toggleUnderMenu = () => {
    setUnderIsOpen(!isUnderOpen);
    setIsOpen(false);
  };
  return (
    <div className={css.menuContainer}>
      <Link href={""} className={css.menuButton} onClick={toggleMenu}>
        {isUnderOpen ? "Практики" : "Настанови"}
      </Link>

      {/* Затемнення фону */}
      <div
        onClick={toggleMenu}
        className={`${css.overlay} ${isOpen || isUnderOpen ? css.show : ""}`}
      />

      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href="/recommendation"
              aria-label="Moon days"
              className={css.linkMenu}
              onClick={toggleMenu}
            >
              Цього дня
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              href="/phases/today"
              aria-label="Moon phases"
              className={css.linkMenu}
              onClick={toggleMenu}
            >
              Фази
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              href="/haircutdays"
              aria-label="Haircur today"
              className={css.linkMenu}
              onClick={toggleMenu}
            >
              Стріжки
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              href=""
              aria-label="Practics"
              className={css.linkMenu}
              onClick={toggleUnderMenu}
            >
              Практики
            </Link>
          </li>
        </ul>
      )}

      {isUnderOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href="/practices/meditation/today"
              aria-label="Moon days"
              className={css.linkMenu}
              onClick={toggleUnderMenu}
            >
              Медитативні
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              href="/practices/occultritual/today"
              aria-label="Moon phases"
              className={css.linkMenu}
              onClick={toggleUnderMenu}
            >
              Окультні
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Menu;
