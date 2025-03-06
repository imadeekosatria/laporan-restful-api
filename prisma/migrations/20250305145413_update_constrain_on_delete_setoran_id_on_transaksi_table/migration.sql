-- DropForeignKey
ALTER TABLE "transaksi" DROP CONSTRAINT "transaksi_setoran_id_fkey";

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_setoran_id_fkey" FOREIGN KEY ("setoran_id") REFERENCES "setoran"("id") ON DELETE CASCADE ON UPDATE CASCADE;
