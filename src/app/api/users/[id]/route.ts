import { prisma } from "@/database/prisma";
import { NextResponse } from "next/server";
import { userReturnSchema } from "../schema";

export const GET = async (
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) => {
  if (isNaN(Number(params.id))) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });

  if (user == null) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const responseUser = userReturnSchema.parse(user);
  return NextResponse.json(responseUser);
};
