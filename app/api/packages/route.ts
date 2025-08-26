import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const trips = await prisma.trip.findMany({
      orderBy: { createdAt: "desc" }, // latest trips pehle
    });
    return NextResponse.json(trips);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch trips" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, destination, price, startDate, endDate, imageUrl } =
      await req.json();

    // 🔹 Check all required fields
    if (!title || !description || !destination || !price || !startDate || !endDate || !imageUrl) {
      return NextResponse.json(
        { error: "All fields (title, description, destination, price, startDate, endDate, imageUrl) are required" },
        { status: 400 }
      );
    }

    // 🔹 Create trip in DB
    const created = await prisma.trip.create({
      data: {
        title,
        description,
        destination,
        price: Number(price),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        imageUrl,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("❌ Error creating trip:", err);
    return NextResponse.json({ error: "Failed to create trip" }, { status: 500 });
  }
}
