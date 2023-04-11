/*
  Warnings:

  - Added the required column `percentage` to the `Reward` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reward" ADD COLUMN     "percentage" INTEGER NOT NULL;
