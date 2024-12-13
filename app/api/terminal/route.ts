import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Mengambil data terminal dari database
    const terminals = await prisma.terminal.findMany({
      select: {
        id: true,
        nama: true,
        kecamatan: true,
        kota: true,
        provinsi: true,
      },
    });

    return new Response(JSON.stringify(terminals), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching terminals:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch terminals" }),
      { status: 500 }
    );
  }
}
