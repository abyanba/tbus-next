import { prisma } from "@/lib/prisma";

export const getJadwals = async () => {
  try {
    const jadwals = await prisma.jadwal.findMany({
      include: {
        nama_bus: true,    
        rute: {
          include: {
            terminal_keberangkatan: { select: { nama: true, kota: true } },
            terminal_tujuan: { select: { nama: true, kota: true } },
          },
        },        
        seats: {            
          include: {
            seat: true,  
          },
        },
      },
    });
    return jadwals;
  } catch (error) {
    console.error("Error fetching jadwal data:", error);
    throw new Error("Failed to fetch jadwal data");
  }
};

// Fetch a single jadwal by ID with related bus and route information
export const getJadwalById = async (id: string) => {
  try {
    const jadwal = await prisma.jadwal.findUnique({
      where: { id: parseInt(id) },
      include: {
        nama_bus: true,
        rute: {
          include: {
            terminal_keberangkatan: { select: { nama: true, kota: true } },
            terminal_tujuan: { select: { nama: true, kota: true } },
          },
        },      
        seats: {         
          include: {
            seat: true,
          },
        },
      },
    });
    return jadwal;
  } catch (error) {
    console.error("Error fetching jadwal by ID:", error);
    throw new Error("Failed to fetch jadwal data by ID");
  }
};
