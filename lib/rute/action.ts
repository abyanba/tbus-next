"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const RuteSchema = z.object({
  terminalKeberangkatanId: z.number(),
  terminalTujuanId: z.number(),
});

// Create Rute
export const saveRute = async (prevState: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData.entries());

  const data = {
    terminalKeberangkatanId: parseInt(rawData.terminalKeberangkatanId as string, 10),
    terminalTujuanId: parseInt(rawData.terminalTujuanId as string, 10),
  };

  const validatedFields = RuteSchema.safeParse(data);

  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error.flatten().fieldErrors);
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Validasi jika terminal keberangkatan dan tujuan sama
  if (validatedFields.data.terminalKeberangkatanId === validatedFields.data.terminalTujuanId) {
    return {
      Error: {
        terminalKeberangkatanId: ["Terminal keberangkatan dan terminal tujuan tidak boleh sama."],
        terminalTujuanId: ["Terminal keberangkatan dan terminal tujuan tidak boleh sama."],
      },
    };
  }

  // Validasi untuk duplikat rute
  const existingRute = await prisma.rute.findFirst({
    where: {
      terminalKeberangkatanId: validatedFields.data.terminalKeberangkatanId,
      terminalTujuanId: validatedFields.data.terminalTujuanId,
    },
  });

  if (existingRute) {
    return {
      Error: {
        terminalKeberangkatanId: ["Rute ini sudah ada."],
        terminalTujuanId: ["Rute ini sudah ada."],
      },
    };
  }

  try {
    await prisma.rute.create({
      data: {
        terminalKeberangkatanId: validatedFields.data.terminalKeberangkatanId,
        terminalTujuanId: validatedFields.data.terminalTujuanId,
      },
    });
  } catch (error) {
    console.error("Error saving rute data to database:", error);
    return { message: "Failed to create rute" };
  }

  revalidatePath("/rute");
  redirect("/rute");
};

// Update Rute
export const updateRute = async (id: string, prevState: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData.entries());

  const data = {
    terminalKeberangkatanId: parseInt(rawData.terminalKeberangkatanId as string, 10),
    terminalTujuanId: parseInt(rawData.terminalTujuanId as string, 10),
  };

  const validatedFields = RuteSchema.safeParse(data);

  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error.flatten().fieldErrors);
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Validasi jika terminal keberangkatan dan tujuan sama
  if (validatedFields.data.terminalKeberangkatanId === validatedFields.data.terminalTujuanId) {
    return {
      Error: {
        terminalKeberangkatanId: ["Terminal keberangkatan dan terminal tujuan tidak boleh sama."],
        terminalTujuanId: ["Terminal keberangkatan dan terminal tujuan tidak boleh sama."],
      },
    };
  }

  // Validasi untuk duplikat rute yang sama (tetapi dengan pengecualian ID)
  const existingRute = await prisma.rute.findFirst({
    where: {
      terminalKeberangkatanId: validatedFields.data.terminalKeberangkatanId,
      terminalTujuanId: validatedFields.data.terminalTujuanId,
      NOT: {
        id: parseInt(id),
      },
    },
  });

  if (existingRute) {
    return {
      Error: {
        terminalKeberangkatanId: ["Rute ini sudah ada."],
        terminalTujuanId: ["Rute ini sudah ada."],
      },
    };
  }

  try {
    await prisma.rute.update({
      where: { id: parseInt(id) },
      data: {
        terminalKeberangkatanId: validatedFields.data.terminalKeberangkatanId,
        terminalTujuanId: validatedFields.data.terminalTujuanId,
      },
    });
  } catch (error) {
    console.error("Error updating rute:", error);
    return { message: "Failed to update rute" };
  }

  revalidatePath("/rute");
  redirect("/rute");
};

export const deleteRute = async (id: string) => {
  try {
    await prisma.rute.delete({
      where: { id: parseInt(id) },
    });
    revalidatePath("/rute");
  } catch (error) {
    console.error("Failed to delete rute:", error);
    return { message: "Failed to delete rute" };
  }
};
