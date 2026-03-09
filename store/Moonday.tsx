"use client";

import { useEffect, useMemo, useState } from "react";
import { useMoonStore } from "@/store/calendarStore";
import { aspectGroups } from "@/lib/aspect";

type MoondayTemplateProps = {
  day: any; // потім типізуємо
  selectedAspectIds: string[];
  toggleAspect: (key: string) => void;
  selectAllAspects: () => void;
  clearAllAspects: () => void;
};

export const MoondayTemplate = (fetchFn: () => Promise<void>) => {
  const {
    today,
    selectedAspectIds,
    toggleAspect,
    selectAllAspects,
    clearAllAspects,
  } = useMoonStore();

  const [openGroups, setOpenGroups] = useState<string[]>([]);

  useEffect(() => {
    fetchFn();
  }, [fetchFn]);

  const groupedAspects = useMemo(() => {
    if (!today) return {};

    const resDay = today.details;

    return Object.entries(resDay.lifeAspects).reduce(
      (acc, [key, aspect]) => {
        const group = aspectGroups[key] ?? "Інше";
        if (!acc[group]) acc[group] = [];
        acc[group].push({ key, aspect });
        return acc;
      },
      {} as Record<string, { key: string; aspect: any }[]>,
    );
  }, [today]);

  useEffect(() => {
    if (!today) return;

    const groupsToOpen = Object.entries(groupedAspects)
      .filter(([_, items]) =>
        items.some(({ key }) => selectedAspectIds.includes(key)),
      )
      .map(([groupName]) => groupName);

    if (groupsToOpen.length > 0) {
      setOpenGroups((prev) => Array.from(new Set([...prev, ...groupsToOpen])));
    }
  }, [selectedAspectIds, groupedAspects, today]);

  const toggleGroup = (groupName: string) => {
    setOpenGroups((prev) =>
      prev.includes(groupName)
        ? prev.filter((g) => g !== groupName)
        : [...prev, groupName],
    );
  };

  const showRemoveAll = selectedAspectIds.length >= 2;

  return {
    today,
    groupedAspects,
    openGroups,
    toggleGroup,
    selectedAspectIds,
    toggleAspect,
    selectAllAspects,
    clearAllAspects,
    showRemoveAll,
  };
};
