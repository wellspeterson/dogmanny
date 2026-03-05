"use client";

import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
      <div
        key={pathname}
        style={{ animation: "fadeIn 0.15s ease-in" }}
      >
        {children}
      </div>
    </>
  );
}
