import { prisma } from "@/lib/prisma";

export const getBuses = async () => {
  try {
    const buses = await prisma.bus.findMany({
      include: {
        fasilitas: true, 
      },
    });
    return buses;
  } catch (error) {
    console.error("Error fetching bus data:", error);
    throw new Error("Failed to fetch bus data");
  }
};

export const getBusesById = async (id: string) => {
    try {
      const bus = await prisma.bus.findUnique({
        where: { id: parseInt(id) },
        include: {
          fasilitas: true,
        },
      });
  
      if (!bus) {
        throw new Error(`Bus with ID ${id} not found`);
      }
  
      return bus;
    } catch (error) {
      console.error("Error fetching bus by ID:", error);
      throw new Error(`Failed to fetch bus data with ID ${id}`);
    }
  };
