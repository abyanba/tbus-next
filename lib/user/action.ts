"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const UserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  telepon: z.string().min(10),
  role: z.enum(["USER", "ADMIN"]), // Menyesuaikan dengan enum Role
});

export const saveUser = async (prevState: any, formData: FormData) => {
  const validatedFields = UserSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.user.create({
      data: {
        nama: validatedFields.data.name,
        email: validatedFields.data.email,
        telepon: validatedFields.data.telepon,
        role: validatedFields.data.role,
      },
    });
  } catch (error) {
    return { message: "Failed to create user" };
  }

  revalidatePath("/user");
  redirect("/user");
};

export const updateUser = async (id: string, prevState: any, formData: FormData) => {
  const validatedFields = UserSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.user.update({
      data: {
        nama: validatedFields.data.name,
        email: validatedFields.data.email,
        telepon: validatedFields.data.telepon,
        role: validatedFields.data.role,
      },
      where: { id: parseInt(id) },
    });
  } catch (error) {
    return { message: "Failed to update user" };
  }

  revalidatePath("/user");
  redirect("/user");
};

export const deleteUser = async (id: string) => {
  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    return { message: "Failed to delete user" };
  }

  revalidatePath("/user");
};
