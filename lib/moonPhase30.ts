// moonPhase30.ts

export const moonImages32: Record<number, string> = Object.fromEntries(
  Array.from({ length: 30 }).map((_, i) => [
    i + 1,
    `/image/MoonPhase/WebP32/day${i + 1}.webp`,
  ])
);

export const moonImages160: Record<number, string> = Object.fromEntries(
  Array.from({ length: 30 }).map((_, i) => [
    i + 1,
    `/image/MoonPhase/WebP160/day${i + 1}.webp`,
  ])
);