/*
  Warnings:

  - You are about to drop the column `terminalKeberangkatanId` on the `jadwal` table. All the data in the column will be lost.
  - You are about to drop the column `terminalTujuanId` on the `jadwal` table. All the data in the column will be lost.
  - Added the required column `ruteId` to the `Jadwal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `jadwal` DROP FOREIGN KEY `Jadwal_terminalKeberangkatanId_fkey`;

-- DropForeignKey
ALTER TABLE `jadwal` DROP FOREIGN KEY `Jadwal_terminalTujuanId_fkey`;

-- AlterTable
ALTER TABLE `jadwal` DROP COLUMN `terminalKeberangkatanId`,
    DROP COLUMN `terminalTujuanId`,
    ADD COLUMN `ruteId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Rute` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `terminalKeberangkatanId` INTEGER NOT NULL,
    `terminalTujuanId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Jadwal` ADD CONSTRAINT `Jadwal_ruteId_fkey` FOREIGN KEY (`ruteId`) REFERENCES `Rute`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rute` ADD CONSTRAINT `Rute_terminalKeberangkatanId_fkey` FOREIGN KEY (`terminalKeberangkatanId`) REFERENCES `Terminal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rute` ADD CONSTRAINT `Rute_terminalTujuanId_fkey` FOREIGN KEY (`terminalTujuanId`) REFERENCES `Terminal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
