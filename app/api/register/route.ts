import { prisma } from "@/lib/prima";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { email, password, name } = await req.json();
    const hashed = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
      },
    });

    return NextResponse.json({
      user: user.email,
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 500,
      }
    );
  }
};
