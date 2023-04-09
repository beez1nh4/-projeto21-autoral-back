/*
  Warnings:

  - Added the required column `type` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LinkType" AS ENUM ('FIXED', 'SEARCH', 'FUN', 'EXERCISE', 'OTHER');

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "type" "LinkType" NOT NULL;
