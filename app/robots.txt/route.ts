import { NextResponse } from "next/server";

const robots = `User-agent: *
Allow: /

Sitemap: https://rehas.in/sitemap.xml
Host: rehas.in
`;

export async function GET() {
  return new NextResponse(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
