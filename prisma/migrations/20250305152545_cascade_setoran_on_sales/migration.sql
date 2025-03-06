-- DropForeignKey
ALTER TABLE "setoran" DROP CONSTRAINT "setoran_sales_id_fkey";

-- AddForeignKey
ALTER TABLE "setoran" ADD CONSTRAINT "setoran_sales_id_fkey" FOREIGN KEY ("sales_id") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;
