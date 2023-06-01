import { prisma } from "@/database/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { z } from "zod";
import { loginSchema } from "./schema";
import { TloginRequest } from "./types";

export async function POST(request: Request) {
  const body: TloginRequest = await request.json();

  try {
    const bodySerializer = loginSchema.parse(body);

    const findUser = await prisma.user.findUnique({
      where: {
        email: bodySerializer.email,
      },
    });

    if (!findUser) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const passwordMatch: boolean = await compare(
      bodySerializer.password,
      findUser!.password
    );

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const accessToken: string = sign(
      {
        email: findUser!.email,
        type: "access",
      },
      String(process.env.NEXT_PUBLIC_SECRET_KEY),
      {
        expiresIn: process.env.NEXT_PUBLIC_ACCESS_TOKEN_LIFE || "1h",
        subject: String(findUser!.id),
      }
    );

    return NextResponse.json({ accessToken });
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json(
        { message: error.flatten().fieldErrors },
        { status: 400 }
      );
  }
}
