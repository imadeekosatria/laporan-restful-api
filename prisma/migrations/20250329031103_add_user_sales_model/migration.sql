-- AlterTable
ALTER TABLE "sales" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "user_sales" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "sales_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_sales_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_sales" ADD CONSTRAINT "user_sales_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sales" ADD CONSTRAINT "user_sales_sales_id_fkey" FOREIGN KEY ("sales_id") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;
