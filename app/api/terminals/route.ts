import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetching all terminal data
    const terminals = await prisma.terminal.findMany({
      select: {
        id: true,
        nama: true,
        kota: true,
      },
    });
    return NextResponse.json(terminals, { status: 200 });
  } catch (error) {
    console.error("Error fetching terminal data:", error);
    return NextResponse.json({ error: "Failed to fetch terminal data" }, { status: 500 });
  }
}
