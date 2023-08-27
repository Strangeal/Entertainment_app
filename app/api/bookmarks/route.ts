import { prisma } from "@/lib/prima";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "You're not authorized" });
  }
  const json = await request.json();
  const userId = session.user?.id;
  if (!userId) {
    return NextResponse.json({ message: "You're not authorized" });
  }
  const created = await prisma.bookmark.create({
    data: {
      userId,
      mediaId: json.mediaId,
      isBookmarked: json.isBookmarked,
    },
  });
  return new NextResponse(JSON.stringify(created), { status: 201 });
}
