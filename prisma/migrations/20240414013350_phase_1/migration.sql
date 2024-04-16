/*
  Warnings:

  - You are about to drop the column `resturant_id` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `resturant_id` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `Resturant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `restaurant_id` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurant_id` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_resturant_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_resturant_id_fkey";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "resturant_id",
ADD COLUMN     "restaurant_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "resturant_id",
ADD COLUMN     "restaurant_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Resturant";

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
