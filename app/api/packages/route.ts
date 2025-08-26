import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(packages);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, imageUrl } = await req.json();

    if (!title || !description || !imageUrl) {
      return NextResponse.json(
        { error: "title, description, imageUrl are required" },
        { status: 400 }
      );
    }

    const created = await prisma.package.create({
      data: { title, description, imageUrl },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create package" }, { status: 500 });
  }
}
