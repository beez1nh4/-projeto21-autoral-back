/*
  Warnings:

  - Added the required column `year` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Progress" ADD COLUMN     "year" INTEGER NOT NULL;
