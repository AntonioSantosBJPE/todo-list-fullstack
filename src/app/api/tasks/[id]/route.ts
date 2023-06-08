import { prisma } from "@/database/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { validToken } from "../../utils";
import { taskUpdateSchema } from "../schema";
import { TtaskUpdateRequest } from "../types";

export const PATCH = async (
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) => {
  if (isNaN(Number(params.id))) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  let body: TtaskUpdateRequest;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ message: "invalid body" }, { status: 400 });
  }

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

  try {
    const bodySerializer = taskUpdateSchema.parse(body);

    const taskFind = await prisma.task.findUnique({
      where: { id: Number(params.id) },
    });

    if (taskFind == null) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    if (taskFind.userId !== userId) {
      return NextResponse.json(
        { message: "Insufficient permission" },
        { status: 403 }
      );
    }

    const updateTask = await prisma.task.update({
      where: {
        id: taskFind.id,
      },
      data: {
        ...bodySerializer,
      },
    });

    return NextResponse.json(updateTask);
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json(
        { message: error.flatten().fieldErrors },
        { status: 400 }
      );
  }

  return NextResponse.json("responseUser");
};
