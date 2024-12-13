import { prisma } from "@/lib/prisma";

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch user data");
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    return user;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};
