// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("ACCESS_TOKEN")?.value;
  const { pathname } = request.nextUrl;
  const isLoggedIn = !!token;

  // 1. ระบุ Path ที่คุณมีจริงๆ ในโปรเจกต์ (เพื่อทำ Whitelist)
  const validFolders = ["/", "/auth", "/admin", "/dashboard", "/blog"];

  // ตรวจสอบว่าเป็น sub-path หรือไม่ (เช่น /blog/123 หรือ /dashboard/settings)
  const isSubPath = (basePath) => pathname.startsWith(`${basePath}/`);

  // เช็คว่า path นี้มีอยู่จริงไหม
  const isValidPath =
    validFolders.includes(pathname) ||
    validFolders.some((folder) => isSubPath(folder));

  // --- Logic การ Redirect ---

  // 1. ถ้าเข้า /auth ให้ไป /admin (หน้า Login)
  if (pathname === "/auth") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // 2. ถ้าเข้าหน้า /admin แล้ว Login อยู่ -> ไป /dashboard
  if (pathname === "/admin" && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 3. ถ้าเข้าหน้า /dashboard แล้วไม่ได้ Login -> กลับไป /admin
  if (pathname.startsWith("/dashboard") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // 4. ถ้า path ไม่มีอยู่จริง (ไม่ใช่ valid folder) -> ไป /
  if (!isValidPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Regex นี้จะกันไฟล์ system ออกไป ทำให้ middleware ทำงานกับแค่ URL หลัก
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
