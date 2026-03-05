"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const lastPathRef = useRef(pathname);

  // Synchronously hide content when route changes (runs during render,
  // so the DOM never commits a frame with old content at full opacity)
  if (lastPathRef.current !== pathname) {
    lastPathRef.current = pathname;
    if (visible) setVisible(false);
  }

  useEffect(() => {
    if (!visible) {
      // Wait two frames so the new page content is fully painted, then reveal
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });
      return () => cancelAnimationFrame(id);
    }
  }, [visible]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: visible ? "opacity 0.2s ease-in" : "none",
      }}
    >
      {children}
    </div>
  );
}
