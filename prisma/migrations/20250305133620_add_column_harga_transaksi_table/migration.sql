/*
  Warnings:

  - Added the required column `harga` to the `laporan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "laporan" ADD COLUMN     "harga" MONEY NOT NULL;
