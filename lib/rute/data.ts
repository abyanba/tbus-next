import { prisma } from "@/lib/prisma";

export const getRutes = async () => {
  try {
    const rutes = await prisma.rute.findMany({
      include: {
        terminal_keberangkatan: true,
        terminal_tujuan: true,      
        jadwals: true,              
      },
    });
    return rutes;
  } catch (error) {
    console.error("Error fetching route data:", error);
    throw new Error("Failed to fetch route data");
  }
};

// Function to get a route by its ID
export const getRutesById = async (id: string) => {
  try {
    const rutes = await prisma.rute.findUnique({
      where: { id: parseInt(id) },
      include: {
        terminal_keberangkatan: true,
        terminal_tujuan: true,      
        jadwals: true,              
      },
    });
    return rutes;
  } catch (error) {
    console.error("Error fetching route data:", error);
    throw new Error("Failed to fetch route data");
  }
};
