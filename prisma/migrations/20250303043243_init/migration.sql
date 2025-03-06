-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN');

-- CreateTable
CREATE TABLE "users" (
    "username" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'SUPER_ADMIN',
    "token" VARCHAR(100),

    CONSTRAINT "users_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100),
    "phone" VARCHAR(100),
    "address" VARCHAR(100),

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produk" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "harga_satuan" MONEY,
    "harga" MONEY NOT NULL,
    "stok" INTEGER,
    "description" TEXT,

    CONSTRAINT "produk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "laporan" (
    "id" TEXT NOT NULL,
    "sales_id" TEXT NOT NULL,
    "produk_id" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "total" MONEY NOT NULL,
    "transaksi_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "laporan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaksi" (
    "id" TEXT NOT NULL,
    "sales_id" TEXT NOT NULL,
    "total" MONEY NOT NULL,
    "setoran" MONEY NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaksi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sales_email_key" ON "sales"("email");

-- CreateIndex
CREATE UNIQUE INDEX "produk_name_key" ON "produk"("name");

-- AddForeignKey
ALTER TABLE "laporan" ADD CONSTRAINT "laporan_produk_id_fkey" FOREIGN KEY ("produk_id") REFERENCES "produk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laporan" ADD CONSTRAINT "laporan_sales_id_fkey" FOREIGN KEY ("sales_id") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laporan" ADD CONSTRAINT "laporan_transaksi_id_fkey" FOREIGN KEY ("transaksi_id") REFERENCES "transaksi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_sales_id_fkey" FOREIGN KEY ("sales_id") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
