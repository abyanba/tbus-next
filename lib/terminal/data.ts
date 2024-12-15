import { prisma } from "@/lib/prisma";

export const getTerminals = async () => {
  try {
    const terminals = await prisma.terminal.findMany({
      include: {
        keberangkatanRute: {
          include: {
            jadwals: true, // Include associated jadwal for keberangkatan
          },
        },
        tujuanRute: {
          include: {
            jadwals: true, // Include associated jadwal for tujuan
          },
        },
      },
    });
    return terminals;
  } catch (error) {
    console.error("Error fetching terminal data:", error);
    throw new Error("Failed to fetch terminal data");
  }
};

export const getTerminalById = async (id: string) => {
  try {
    const terminal = await prisma.terminal.findUnique({
      where: { id: parseInt(id) },
      include: {
        keberangkatanRute: {
          include: {
            jadwals: true, // Include associated jadwal for keberangkatan
          },
        },
        tujuanRute: {
          include: {
            jadwals: true, // Include associated jadwal for tujuan
          },
        },
      },
    });
    return terminal;
  } catch (error) {
    throw new Error("Failed to fetch terminal data");
  }
};
