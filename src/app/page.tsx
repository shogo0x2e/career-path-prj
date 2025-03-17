"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/my/assessment");
  }, [router]);

  // リダイレクト中は何も表示しない
  return null;
}
