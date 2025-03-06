/*
  Warnings:

  - You are about to drop the `laporan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "laporan" DROP CONSTRAINT "laporan_produk_id_fkey";

-- DropForeignKey
ALTER TABLE "laporan" DROP CONSTRAINT "laporan_sales_id_fkey";

-- DropForeignKey
ALTER TABLE "laporan" DROP CONSTRAINT "laporan_setoran_id_fkey";

-- DropTable
DROP TABLE "laporan";

-- CreateTable
CREATE TABLE "transaksi" (
    "id" TEXT NOT NULL,
    "sales_id" TEXT NOT NULL,
    "produk_id" TEXT NOT NULL,
    "jumlah" DECIMAL(65,30) NOT NULL,
    "harga" MONEY NOT NULL,
    "total" MONEY NOT NULL,
    "setoran_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaksi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_produk_id_fkey" FOREIGN KEY ("produk_id") REFERENCES "produk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_sales_id_fkey" FOREIGN KEY ("sales_id") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_setoran_id_fkey" FOREIGN KEY ("setoran_id") REFERENCES "setoran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
