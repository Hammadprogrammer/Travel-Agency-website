import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const destination = formData.get("destination") as string | null;
    const price = formData.get("price") ? Number(formData.get("price")) : null;
    const startDate = formData.get("startDate") as string | null;
    const endDate = formData.get("endDate") as string | null;
    const image = formData.get("image") as File | null;

    if (!title || !description || !destination || !price || !startDate || !endDate || !image) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "trips" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    const trip = await prisma.trip.create({
      data: {
        title,
        description,
        destination,
        price,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        imageUrl: uploadResponse.secure_url, 
      },
    });

    return NextResponse.json(trip, { status: 201 });
  } catch (error: any) {
    console.error("❌ Error creating trip:", error.message || error);
    return NextResponse.json(
      { error: error.message || "Failed to create trip" },
      { status: 500 }
    );
  }
  
}
