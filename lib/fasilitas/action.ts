"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FasilitasSchema = z.object({
  name: z.string().min(1),
});

export const saveFasilitas = async (prevState: any, formData: FormData) => {
  const validatedFields = FasilitasSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.fasilitas.create({
      data: {
        nama: validatedFields.data.name,
      },
    });
  } catch (error) {
    return { message: "Failed to create fasilitas" };
  }

  revalidatePath("/fasilitas");
  redirect("/fasilitas");
};

export const updateFasilitas = async (
  id: string,
  prevState: any,
  formData: FormData
) => {
  const validatedFields = FasilitasSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.fasilitas.update({
      data: {
        nama: validatedFields.data.name,
      },
      where: { id: parseInt(id) },
    });
  } catch (error) {
    return { message: "Failed to update fasilitas" };
  }

  revalidatePath("/fasilitas");
  redirect("/fasilitas");
};

export const deleteFasilitas = async (id: string) => {
  try {
    await prisma.fasilitas.delete({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    return { message: "Failed to delete fasilitas" };
  }

  revalidatePath("/fasilitas");
};
