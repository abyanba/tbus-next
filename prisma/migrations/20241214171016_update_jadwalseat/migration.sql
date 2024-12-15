/*
  Warnings:

  - A unique constraint covering the columns `[jadwalId,seatId]` on the table `JadwalSeat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `JadwalSeat_jadwalId_seatId_key` ON `JadwalSeat`(`jadwalId`, `seatId`);
