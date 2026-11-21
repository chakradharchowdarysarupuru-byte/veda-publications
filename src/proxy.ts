import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// The old WordPress site linked pages as /?page_id=N (or /?p=N), and search
// engines still list those URLs. Send each one to its home on the new site.
const LEGACY_PAGES: Record<string, string> = {
  "2": "/#about", // About us
  "19": "/#contact", // Contact us
  "22": "/books", // Publications
  "47": "/#submissions", // ISBN publication guidelines
  "52": "/#submissions", // ISBN dissertations/thesis
  "438": "/calls", // Call for book chapters
};

export function proxy(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("page_id") ?? searchParams.get("p");
  const target = id ? LEGACY_PAGES[id] : undefined;

  if (target) {
    return NextResponse.redirect(new URL(target, request.url), 308);
  }

  // /index.php was WordPress's front controller; anything else there goes home.
  if (request.nextUrl.pathname === "/index.php") {
    return NextResponse.redirect(new URL("/", request.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/index.php"],
};
