/*
  Warnings:

  - You are about to drop the column `endsAt` on the `Hobby` table. All the data in the column will be lost.
  - You are about to drop the column `startsAt` on the `Hobby` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Hobby" DROP COLUMN "endsAt",
DROP COLUMN "startsAt";
