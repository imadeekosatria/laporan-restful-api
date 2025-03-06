/*
  Warnings:

  - You are about to drop the column `transaksi_id` on the `laporan` table. All the data in the column will be lost.
  - You are about to drop the `transaksi` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `setoran_id` to the `laporan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "laporan" DROP CONSTRAINT "laporan_transaksi_id_fkey";

-- DropForeignKey
ALTER TABLE "transaksi" DROP CONSTRAINT "transaksi_sales_id_fkey";

-- AlterTable
ALTER TABLE "laporan" DROP COLUMN "transaksi_id",
ADD COLUMN     "setoran_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "transaksi";

-- CreateTable
CREATE TABLE "setoran" (
    "id" TEXT NOT NULL,
    "sales_id" TEXT NOT NULL,
    "total" MONEY NOT NULL,
    "setor" MONEY NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "setoran_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "laporan" ADD CONSTRAINT "laporan_setoran_id_fkey" FOREIGN KEY ("setoran_id") REFERENCES "setoran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "setoran" ADD CONSTRAINT "setoran_sales_id_fkey" FOREIGN KEY ("sales_id") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
