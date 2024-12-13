import { prisma } from "@/lib/prisma";

export const getFasilitas = async () => {
  try {
    const fasilitas = await prisma.fasilitas.findMany({
      include: { buses: true },
    });
    return fasilitas;
  } catch (error) {
    console.error("Error fetching fasilitas data:", error);
    throw new Error("Failed to fetch fasilitas data");
  }
};

export const getFasilitasById = async (id: string) => {
  try {
    const fasilitas = await prisma.fasilitas.findUnique({
      where: { id: parseInt(id) },
    });
    return fasilitas;
  } catch (error) {
    console.error("Error fetching fasilitas data by ID:", error);
    throw new Error("Failed to fetch fasilitas data");
  }
};
