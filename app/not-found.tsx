// app/not-found.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/"), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <h1>404 - Сторінка не знайдена</h1>
      <p>Вибачте, сторінка, яку ви шукаєте, не існує.</p>
      <Link href="/">Перейти на головну сторінку</Link>
    </div>
  );
};

export default NotFound;
