import { NextResponse } from "next/server";
import { units } from "@/db/schema";
import db from "@/db/drizzle";
import { getIsAdmin } from "@/lib/admin";

export const GET = async () => {
  const isAdmin = getIsAdmin();

  if (!isAdmin) return NextResponse.json("Unauthorized!", { status: 401 });

  const data = await db.query.units.findMany();
  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  const isAdmin = getIsAdmin();

  if (!isAdmin) return NextResponse.json("Unauthorized!", { status: 401 });

  const body = await req.json();

  const data = await db
    .insert(units)
    .values({
      ...body,
    })
    .returning();

  return NextResponse.json(data[0]);
};
