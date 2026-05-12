"use client";

import { usePathname } from "next/navigation";

export default function HideOnRoutes({ children, routes }: { children: React.ReactNode, routes: string[] }) {
  const pathname = usePathname();
  
  if (routes.includes(pathname)) {
    return null;
  }
  
  return <>{children}</>;
}
