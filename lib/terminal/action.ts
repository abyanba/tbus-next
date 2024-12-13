"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


const TerminalSchema = z.object({
  name: z.string().min(3),
  kota: z.string().min(3),
  provinsi: z.string().min(3),
  kecamatan: z.string().min(3),
});

export const saveTerminal = async (prevState: any, formData: FormData) => {
  const validatedFields = TerminalSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.terminal.create({
      data: {
        nama: validatedFields.data.name,
        kota: validatedFields.data.kota,
        provinsi: validatedFields.data.provinsi,
        kecamatan: validatedFields.data.kecamatan,
      },
    });
  } catch (error) {
    return { message: "Failed to create terminal" };
  }

  revalidatePath("/terminal");
  redirect("/terminal");
};

export const updateTerminal = async (
  id: string,
  prevState: any,
  formData: FormData
) => {
  const validatedFields = TerminalSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.terminal.update({
      data: {
        nama: validatedFields.data.name,
        kota: validatedFields.data.kota,
        provinsi: validatedFields.data.provinsi,
        kecamatan: validatedFields.data.kecamatan,  // Pastikan kecamatan juga disertakan
      },
      where: { id: parseInt(id) },
    });
  } catch (error) {
    return { message: "Failed to update terminal" };
  }

  revalidatePath("/terminal");
  redirect("/terminal");
};

export const deleteTerminal = async (id: string) => {
  try {
    await prisma.terminal.delete({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    return { message: "Failed to delete terminal" };
  }

  revalidatePath("/terminal");
};
