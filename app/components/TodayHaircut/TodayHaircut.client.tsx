"use client";

import { useMoonStore } from "@/store/calendarStore";
import { useEffect } from "react";

const TodayHaircutClient = async () => {
  const { todayHaircut, fetchTodayHaircut } = useMoonStore();

  useEffect(() => {
    fetchTodayHaircut();
  }, []);
  return (
    <div>
      <br />
      date: {todayHaircut?.date}
      <br />
      <br />
      dayNumber: {todayHaircut?.dayNumber}
      <br />
      <br />
      energy: {todayHaircut?.energy}
      <br />
      <br />
      health:
      <br />
      {todayHaircut?.health}
      <br />
      <br />
      wealth:
      <br />
      {todayHaircut?.wealth}
      <br />
      <br />
      recommend:
      <br />
      {todayHaircut?.recommend}
      <br />
      <br />
      avoid:
      <br />
      {todayHaircut?.avoid}
      <br />
      <br />
      why: {todayHaircut?.why}
    </div>
  );
};

export default TodayHaircutClient;
