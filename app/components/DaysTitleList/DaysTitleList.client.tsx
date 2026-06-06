"use client";

import { useQuery } from "@tanstack/react-query";
import { getMoondayList } from "@/lib/api/api";
import Link from "next/link";
import { useUIStore } from "@/store/uiStore";
import { moonImages32 } from "@/lib/moonPhase30";
import css from "./MoonDayItem.module.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useMoonToday } from "@/lib/hooks/useToday";
// import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useWindowSize } from "@/lib/hooks/useWindowSize";
import { useEffect, useState } from "react";
import DaysTitlesDesktop from "./DaysTitlesDesktop";
// import dynamic from "next/dynamic";

// const DaysTitlesDesktop = dynamic(() => import("./DaysTitlesDesktop"), {
//   ssr: false,
// });

export function DaysTitlesList() {
  const { data: days, isPending } = useQuery({
    queryKey: ["catalogdays"],
    queryFn: getMoondayList,
    staleTime: Infinity,
  });
  const { data: today, isPending: isTodayPending } = useMoonToday();
  const { id: activeUrlId } = useParams();
  const router = useRouter();

  // 2. Обчислюємо тип екрана
  // const isDesktop = width ? width >= 1024 : false;

  const sortedTitles = [...(days?.moonDay ?? [])].sort(
    (a, b) => a.dayNumber - b.dayNumber,
  );

  const activeIndex = sortedTitles.findIndex((day) =>
    activeUrlId ? day._id === activeUrlId : today?.moonDay === day.dayNumber,
  );

  if (
    isPending ||
    isTodayPending ||
    sortedTitles.length === 0 ||
    activeIndex === -1
  ) {
    return <p className={css.loader}>Оновлення даних...</p>;
  }

  return (
    <>
      {/* ==========================================
          1. ДЕСКТОПНА ВЕРСІЯ (Клас контролюється через CSS)
          ========================================== */}
      <div className={css.desktopSection}>
        {/* <div className={css.desktopWrapper}> */}
        <ul className={css.daysGrid}>
          {" "}
          {/* css.daysList*/}
          {sortedTitles.map((day) => {
            const imageClass = css[`day_${day.dayNumber}`] || "";
            const isActive = activeUrlId
              ? activeUrlId === day._id
              : today?.moonDay === day.dayNumber;

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
        {/* </div> */}
      </div>
      {/* ==========================================
          2. МОБІЛЬНА ВЕРСІЯ (Карусель Swiper)
          ========================================== */}
      <div className={css.mobileSection}>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={true}
          spaceBetween={0}
          slidesPerView={"auto"}
          centeredSlides={true}
          initialSlide={activeIndex}
          observer={true}
          observeParents={true}
          key={sortedTitles.length}
          breakpoints={{
            320: { slidesPerView: 8, spaceBetween: 5 },
            480: { slidesPerView: 11, spaceBetween: 12 },
            768: { slidesPerView: 18, spaceBetween: 15 },
            880: { slidesPerView: 30, spaceBetween: 30 },
          }}
          className={css.daysList}
        >
          {sortedTitles.map((day, index) => {
            const imageClass = css[`day_${day.dayNumber}`] || "";
            const isActive = index === activeIndex;

            return (
              <SwiperSlide key={day._id}>
                <Link
                  href={`/moonDays/${day._id}`}
                  className={`${css.moonIcon} ${imageClass} ${isActive ? css.activeDay : ""}`}
                  style={{
                    backgroundImage: `url(${moonImages32[day.dayNumber]})`,
                  }}
                >
                  {day.dayNumber}
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}
