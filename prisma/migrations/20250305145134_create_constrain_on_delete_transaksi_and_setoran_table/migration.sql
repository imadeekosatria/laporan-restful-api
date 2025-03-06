-- DropForeignKey
ALTER TABLE "setoran" DROP CONSTRAINT "setoran_sales_id_fkey";

-- DropForeignKey
ALTER TABLE "transaksi" DROP CONSTRAINT "transaksi_produk_id_fkey";

-- DropForeignKey
ALTER TABLE "transaksi" DROP CONSTRAINT "transaksi_sales_id_fkey";

-- DropForeignKey
ALTER TABLE "transaksi" DROP CONSTRAINT "transaksi_setoran_id_fkey";

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_produk_id_fkey" FOREIGN KEY ("produk_id") REFERENCES "produk"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_sales_id_fkey" FOREIGN KEY ("sales_id") REFERENCES "sales"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_setoran_id_fkey" FOREIGN KEY ("setoran_id") REFERENCES "setoran"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "setoran" ADD CONSTRAINT "setoran_sales_id_fkey" FOREIGN KEY ("sales_id") REFERENCES "sales"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
