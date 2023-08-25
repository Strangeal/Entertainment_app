import { prisma } from "@/lib/prima";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "You're not authorized" });
  }

  const bookmark = await prisma.bookmark.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      media: true,
    },
  });
  return NextResponse.json(bookmark);
}

// update

// Delete

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const deleted = await prisma.bookmark.delete({
    where: {
      id: params.userId,
    },
  });

  return NextResponse.json(deleted);
}
