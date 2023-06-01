import { prisma } from "@/database/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { validToken } from "../utils";
import { taskCreateSchema } from "./schema";
import { TtaskCreateRequest } from "./types";

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

  const tasks = await prisma.task.findMany({
    where: {
      userId,
    },
  });
  return NextResponse.json(tasks);
};

export const POST = async (request: Request) => {
  const authToken = request.headers.get("authorization");
  let body: TtaskCreateRequest;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ message: "invalid body" }, { status: 400 });
  }

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

  try {
    const bodySerializer = taskCreateSchema.parse(body);

    const newTask = await prisma.task.create({
      data: {
        ...bodySerializer,
        userId,
      },
    });

    return NextResponse.json(newTask);
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json(
        { message: error.flatten().fieldErrors },
        { status: 400 }
      );
  }
};
