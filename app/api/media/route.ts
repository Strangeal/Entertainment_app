import { prisma } from "@/lib/prima";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const media = await prisma.media.findMany();
  return NextResponse.json(media);
}

export async function POST(request: Request) {
  const json = await request.json();

  const created = await prisma.media.create({
    data: json,
  });

  return new NextResponse(JSON.stringify(created), { status: 201 });
}
