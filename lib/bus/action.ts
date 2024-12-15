"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const BusSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  telepon: z.string().min(10),
  tipe: z.string().min(3),
  total_seat: z.number(),
  fasilitasIds: z.union([z.array(z.number()), z.undefined()]).optional(), 
});

export const saveBus = async (prevState: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData.entries());

  const fasilitasIds = formData.getAll("fasilitasIds").map((id) => parseInt(id as string, 10));

  const data = {
    ...rawData,
    total_seat: parseInt(rawData.total_seat as string, 10), // Konversi total_seat ke number
    telepon: rawData.telepon as string,
    fasilitasIds, // Gunakan array fasilitasIds yang sudah diproses
  };

  const validatedFields = BusSchema.safeParse(data);

  if (!validatedFields.success) {
    console.error("Validasi gagal:", validatedFields.error.flatten().fieldErrors);
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const telepon = parseInt(validatedFields.data.telepon, 10);

    // Buat bus baru
    const bus = await prisma.bus.create({
      data: {
        nama: validatedFields.data.name,
        email: validatedFields.data.email,
        telepon: telepon,
        tipe: validatedFields.data.tipe,
        total_seat: validatedFields.data.total_seat,
        fasilitas: {
          connect: (validatedFields.data.fasilitasIds ?? []).map((id) => ({ id })), // Gunakan array kosong jika undefined
        },
      },
    });

    const seatsData = [];
    for (let i = 1; i <= validatedFields.data.total_seat; i++) {
      seatsData.push({
        nomor_kursi: i.toString(), // Nomor kursi dalam format "1", "2", ...
        busId: bus.id,
      });
    }

    // Menambahkan kursi ke bus yang baru dibuat
    await prisma.seat.createMany({
      data: seatsData,
    });

  } catch (error) {
    console.error("Error saat menyimpan data ke database:", error);
    return { message: "Failed to create bus" };
  }

  revalidatePath("/bus");
  redirect("/bus");
};
     

export const updateBus = async (id: string, prevState: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData.entries());

  const fasilitasIds = formData.getAll("fasilitasIds").map((id) => parseInt(id as string, 10));

  const data = {
    ...rawData,
    total_seat: parseInt(rawData.total_seat as string, 10),
    telepon: rawData.telepon as string,
    fasilitasIds,
  };

  const validatedFields = BusSchema.safeParse(data);
  if (!validatedFields.success) {
    console.error("Validation errors:", validatedFields.error.flatten().fieldErrors);
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // Update bus
    const bus = await prisma.bus.update({
      where: { id: parseInt(id) },
      data: {
        nama: validatedFields.data.name,
        email: validatedFields.data.email,
        telepon: parseInt(validatedFields.data.telepon),
        tipe: validatedFields.data.tipe,
        total_seat: validatedFields.data.total_seat,
        fasilitas: {
          set: validatedFields.data.fasilitasIds?.map((id) => ({ id })) || [],
        },
      },
    });

    // Check if total_seat has changed
    const currentSeats = await prisma.seat.findMany({
      where: { busId: bus.id },
    });

    const currentSeatCount = currentSeats.length;

    if (validatedFields.data.total_seat > currentSeatCount) {
      // If total_seat increased, add new seats
      const seatsToAdd = [];
      for (let i = currentSeatCount + 1; i <= validatedFields.data.total_seat; i++) {
        seatsToAdd.push({
          nomor_kursi: i.toString(),
          busId: bus.id,
        });
      }

      await prisma.seat.createMany({
        data: seatsToAdd,
      });
    } else if (validatedFields.data.total_seat < currentSeatCount) {
      // If total_seat decreased, remove extra seats
      const seatsToRemove = currentSeats.slice(validatedFields.data.total_seat);
      await prisma.seat.deleteMany({
        where: {
          id: { in: seatsToRemove.map((seat) => seat.id) },
        },
      });
    }

  } catch (error) {
    console.error("Error updating bus:", error);
    return { message: "Failed to update bus" };
  }

  revalidatePath("/bus");
  redirect("/bus");
}; 

export const deleteBus = async (id: string) => {
    try {
      await prisma.bus.delete({
        where: { id: parseInt(id) },
      });
      revalidatePath("/bus");
    } catch (error) {
      console.error("Failed to delete bus:", error);
      return { message: "Failed to delete bus" };
    }
  };  