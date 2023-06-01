import { prisma } from "@/database/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { userReturnSchema } from "../users/schema";
import { validToken } from "../utils";

export const GET = async (request: Request) => {
  const authToken = request.headers.get("authorization");

  if (!authToken) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const { jwtErrorMessage, userEmail, userId } = validToken(authToken);

  if (jwtErrorMessage) {
    return NextResponse.json({ message: jwtErrorMessage }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  try {
    const responseUser = userReturnSchema.parse(user);
    return NextResponse.json(responseUser);
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json(
        { message: error.flatten().fieldErrors },
        { status: 400 }
      );
  }
};
