import { prisma } from "@/lib/prima";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const media = await prisma.media.findUnique({
    where: {
      id,
    },
  });

  return NextResponse.json(media);
}

// Patch
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const json = await request.json();
  const partUpdated = await prisma.media.update({
    where: {
      id: params.id,
    },
    data: json,
  });

  return NextResponse.json(partUpdated);
}

// Delete
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const deleted = await prisma.media.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(deleted);
}
