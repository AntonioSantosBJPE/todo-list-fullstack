import { prisma } from "@/database/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { userRegisterSchema, userReturnSchema } from "./schema";
import { TuserCreateRequest } from "./types";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body: TuserCreateRequest = await request.json();

  try {
    const bodySerializer = userRegisterSchema.parse(body);

    const findUser = await prisma.user.findFirst({
      where: {
        email: bodySerializer.email,
      },
    });

    if (findUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        ...body,
      },
    });

    try {
      const responseUser = userReturnSchema.parse(newUser);
      return NextResponse.json(responseUser);
    } catch (error) {
      if (error instanceof z.ZodError)
        return NextResponse.json(
          { message: error.flatten().fieldErrors },
          { status: 404 }
        );
    }
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json(
        { message: error.flatten().fieldErrors },
        { status: 404 }
      );
  }
}
