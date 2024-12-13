import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const fasilitas = await prisma.fasilitas.findMany({
      include: { buses: true }, // Menyertakan relasi jika diperlukan
    });
    return NextResponse.json(fasilitas, { status: 200 });
  } catch (error) {
    console.error("Error fetching fasilitas data:", error);
    return NextResponse.json({ error: "Failed to fetch fasilitas data" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    const body = await request.json();
  
    try {
      await prisma.bus.update({
        where: { id },
        data: {
          nama: body.name,
          email: body.email,
          telepon: parseInt(body.telepon),
          tipe: body.tipe,
          total_seat: parseInt(body.total_seat),
          fasilitas: {
            set: [], // Hapus relasi lama
            connect: body.fasilitasIds.map((id: number) => ({ id })), // Tambahkan relasi baru
          },
        },
      });
  
      return NextResponse.json({ message: "Bus updated successfully" });
    } catch (error) {
      console.error("Error updating bus:", error);
      return NextResponse.json({ error: "Failed to update bus" }, { status: 500 });
    }
  }