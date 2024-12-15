"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Schema untuk validasi data bus dan jadwal
const JadwalSchema = z.object({
  waktu_keberangkatan: z.date(),
  waktu_tiba: z.date(),
  harga: z.number(),
  namaBusId: z.number(),
  ruteId: z.number(),
});

export const saveJadwal = async (formData: {
  waktuKeberangkatan: Date;
  waktuTiba: Date;
  harga: number;
  busId: number;
  ruteId: number;
}) => {
  const data = {
    waktu_keberangkatan: formData.waktuKeberangkatan,
    waktu_tiba: formData.waktuTiba,
    harga: formData.harga,
    namaBusId: formData.busId,
    ruteId: formData.ruteId,
  };

  const validatedFields = JadwalSchema.safeParse(data);

  if (!validatedFields.success) {
    console.error("Validation errors:", validatedFields.error.flatten().fieldErrors);
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // Ambil total_seat dari Bus berdasarkan namaBusId
    const bus = await prisma.bus.findUnique({
      where: { id: data.namaBusId },
    });

    if (!bus) {
      throw new Error("Bus tidak ditemukan");
    }

    const totalSeat = bus.total_seat;

    // Membuat jadwal baru
    const jadwal = await prisma.jadwal.create({
      data: {
        waktu_keberangkatan: data.waktu_keberangkatan,
        waktu_tiba: data.waktu_tiba,
        harga: data.harga,
        nama_bus: { connect: { id: data.namaBusId } },
        rute: { connect: { id: data.ruteId } },
        // Membuat kursi sesuai dengan total_seat dari Bus
        seats: {
          create: Array.from({ length: totalSeat }, (_, index) => ({
            status: false, // Kursi tersedia
            seat: {
              create: {
                nomor_kursi: (index + 1).toString(),
                busId: data.namaBusId, // Menautkan seat ke bus tertentu
              },
            },
          })),
        },
      },
    });
    
    return jadwal;
  } catch (error) {
    console.error("Error saat menyimpan data jadwal:", error);
    throw new Error("Failed to create jadwal");
  }

};

// Update Jadwal berdasarkan ID
export const updateJadwal = async (id: string, formData: FormData) => {
  const rawData = Object.fromEntries(formData.entries());

  const data = {
    ...rawData,
    harga: parseInt(rawData.harga as string, 10),
    waktu_keberangkatan: new Date(rawData.waktu_keberangkatan as string),
    waktu_tiba: new Date(rawData.waktu_tiba as string),
    namaBusId: parseInt(rawData.namaBusId as string, 10),
    ruteId: parseInt(rawData.ruteId as string, 10),
    total_seat: parseInt(rawData.total_seat as string, 10),
  };

  const validatedFields = JadwalSchema.safeParse(data);

  if (!validatedFields.success) {
    console.error("Validation errors:", validatedFields.error.flatten().fieldErrors);
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // Mengupdate jadwal yang sudah ada
    const updatedJadwal = await prisma.jadwal.update({
      where: { id: parseInt(id) },
      data: {
        waktu_keberangkatan: data.waktu_keberangkatan,
        waktu_tiba: data.waktu_tiba,
        harga: data.harga,
        nama_bus: { connect: { id: data.namaBusId } },
        rute: { connect: { id: data.ruteId } },
        // Update total_seat, buat atau update kursi jika diperlukan
        seats: {
          deleteMany: {}, // Hapus kursi lama jika diperlukan
          create: Array.from({ length: data.total_seat }, (_, index) => ({
            status: false, // Kursi tersedia
            seat: {
              create: {
                nomor_kursi: (index + 1).toString(),
                busId: data.namaBusId,
              },
            },
          })),
        },
      },
    });

    return updatedJadwal;
  } catch (error) {
    console.error("Error saat mengupdate jadwal:", error);
    throw new Error("Failed to update jadwal");
  }
};


export const deleteJadwal = async (id: string) => {
  try {
    await prisma.jadwal.delete({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    console.error("Failed to delete jadwal:", error);
    return { message: "Failed to delete jadwal" };
  }
};

// Update Status Kursi pada JadwalSeat
export const updateJadwalSeatStatus = async (jadwalId: number, seatId: number, status: boolean) => {
  try {
    const updatedJadwalSeat = await prisma.jadwalSeat.updateMany({
      where: {
        jadwalId: jadwalId,
        seatId: seatId,
      },
      data: {
        status: status,
      },
    });
    return updatedJadwalSeat;
  } catch (error) {
    console.error("Error saat mengupdate status kursi pada jadwal:", error);
    throw new Error("Failed to update jadwal seat status");
  }
};

export const checkSeatAvailability = async (jadwalId: number, seatId: number) => {
    try {
      const seatStatus = await prisma.jadwalSeat.findFirst({
        where: {
          jadwalId: jadwalId,
          seatId: seatId,
        },
      });
      return seatStatus ? seatStatus.status : false; // Mengembalikan status kursi
    } catch (error) {
      console.error("Error saat memeriksa status kursi:", error);
      return false;
    }
};

export const saveJadwalWithSeats = async (formData: FormData) => {
  const rawData = Object.fromEntries(formData.entries());
  const data = {
    ...rawData,
    harga: parseInt(rawData.harga as string, 10),
    waktu_keberangkatan: new Date(rawData.waktu_keberangkatan as string),
    waktu_tiba: new Date(rawData.waktu_tiba as string),
    namaBusId: parseInt(rawData.namaBusId as string, 10),
    ruteId: parseInt(rawData.ruteId as string, 10),
    total_seat: parseInt(rawData.total_seat as string, 10),
  };

  try {
    // Membuat jadwal baru beserta kursinya
    const jadwal = await prisma.jadwal.create({
      data: {
        waktu_keberangkatan: data.waktu_keberangkatan,
        waktu_tiba: data.waktu_tiba,
        harga: data.harga,
        nama_bus: { connect: { id: data.namaBusId } },
        rute: { connect: { id: data.ruteId } },
        seats: {
          create: Array.from({ length: data.total_seat }, (_, index) => ({
            status: false, // Status kursi awalnya tersedia
            seat: {
              create: {
                nomor_kursi: (index + 1).toString(),
                busId: data.namaBusId,
              },
            },
          })),
        },
      },
    });

    return jadwal;
  } catch (error) {
    console.error("Error saat menyimpan jadwal dengan kursi:", error);
    throw new Error("Failed to save jadwal with seats");
  }
};