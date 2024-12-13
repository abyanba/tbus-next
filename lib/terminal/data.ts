import { prisma } from "@/lib/prisma";

export const getTerminals = async () => {
  try {
    const terminals = await prisma.terminal.findMany({
      include: { keberangkatanJadwal: true, tujuanJadwal: true },
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
      include: { keberangkatanJadwal: true, tujuanJadwal: true },
    });
    return terminal;
  } catch (error) {
    throw new Error("Failed to fetch terminal data");
  }
};