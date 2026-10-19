import { NextResponse } from "next/server";
import { auth } from "@/auth";

const PUBLIC_PATHS = new Set(["/", "/login", "/signup"]);

export const proxy = auth((req) => {
  const isAuthenticated = !!req.auth?.user;
  const isPublicPath = PUBLIC_PATHS.has(req.nextUrl.pathname);

  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
});

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
