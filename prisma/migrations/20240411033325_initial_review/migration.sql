/*
  Warnings:

  - You are about to drop the column `resturantId` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `resturantID` on the `Review` table. All the data in the column will be lost.
  - Added the required column `resturant_id` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resturant_id` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_resturantId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_resturantID_fkey";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "resturantId",
ADD COLUMN     "resturant_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "resturantID",
ADD COLUMN     "resturant_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_resturant_id_fkey" FOREIGN KEY ("resturant_id") REFERENCES "Resturant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_resturant_id_fkey" FOREIGN KEY ("resturant_id") REFERENCES "Resturant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
