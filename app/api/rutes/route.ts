import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetching all rute data beserta informasi terminal keberangkatan dan tujuan
    const rutes = await prisma.rute.findMany({
      select: {
        id: true,
        terminal_keberangkatan: {
          select: {
            id: true,
            nama: true,
            kota: true,
          },
        },
        terminal_tujuan: {
          select: {
            id: true,
            nama: true,
            kota: true,
          },
        },
      },
    });

    const formattedRutes = rutes.map(rute => {
      const keberangkatan = rute.terminal_keberangkatan;
      const tujuan = rute.terminal_tujuan;
      const formattedName = `${keberangkatan.nama} (${keberangkatan.kota}) - ${tujuan.nama} (${tujuan.kota})`;

      return {
        id: rute.id,
        nama: formattedName,
      };
    });

    return NextResponse.json(formattedRutes, { status: 200 });
  } catch (error) {
    console.error("Error fetching rutes data:", error);
    return NextResponse.json({ error: "Failed to fetch rutes data" }, { status: 500 });
  }
}