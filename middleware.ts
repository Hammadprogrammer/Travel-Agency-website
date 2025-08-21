import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || req.headers.get("authorization")?.replace("Bearer ", "");

  // Agar token na ho to redirect
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // JWT verify karo
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch (err) {
    console.error("Invalid token:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Yeh batao k middleware kin routes par chalega
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // yahan protected routes daalo
};
