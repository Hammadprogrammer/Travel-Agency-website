import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    console.log("📩 Signup request received:", { name, email, password }); // input check

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    console.log("🔎 Existing user check:", existingUser);

    if (existingUser) {
      console.log("⚠️ User already exists:", email);
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔑 Password hashed successfully");

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    console.log("✅ New user created:", user);

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );
    console.log("🎟️ JWT Token generated:", token);

    // Return response with token
    return NextResponse.json({ message: "Signup successful", token });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
