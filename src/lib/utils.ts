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
