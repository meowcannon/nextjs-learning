export { cn } from "cn";

export function getTabValue(pathname: string) {
  if (pathname === "/explore" || pathname.startsWith("/explore"))
    return "explore";
  if (pathname === "/builds" || pathname.startsWith("/builds"))
    return "builds";
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard"))
    return "dashboard";

  return "";
}

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB" }).format(
    value,
  );
