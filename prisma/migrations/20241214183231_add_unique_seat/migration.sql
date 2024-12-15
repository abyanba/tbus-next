/*
  Warnings:

  - A unique constraint covering the columns `[nomor_kursi,busId]` on the table `Seat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Seat_nomor_kursi_busId_key` ON `Seat`(`nomor_kursi`, `busId`);
