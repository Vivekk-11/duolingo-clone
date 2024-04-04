import { NextResponse } from "next/server";
import { courses } from "@/db/schema";
import db from "@/db/drizzle";
import { getIsAdmin } from "@/lib/admin";

export const GET = async () => {
  const isAdmin = getIsAdmin();

  if (!isAdmin) return NextResponse.json("Unauthorized!", { status: 401 });

  const data = await db.query.courses.findMany();
  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  const isAdmin = getIsAdmin();

  if (!isAdmin) return NextResponse.json("Unauthorized!", { status: 401 });

  const body = await req.json();

  const data = await db
    .insert(courses)
    .values({
      ...body,
    })
    .returning();

  return NextResponse.json(data[0]);
};
