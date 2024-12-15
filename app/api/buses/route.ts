import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetching all bus data
    const buses = await prisma.bus.findMany({
      select: {
        id: true,
        nama: true,
      },
    });
    return NextResponse.json(buses, { status: 200 });
  } catch (error) {
    console.error("Error fetching buses data:", error);
    return NextResponse.json({ error: "Failed to fetch buses data" }, { status: 500 });
  }
}
