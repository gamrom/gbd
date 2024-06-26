import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  const responseAPI = await fetch(`${request.nextUrl.origin}/api/auth`, {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  return NextResponse.next();
}
