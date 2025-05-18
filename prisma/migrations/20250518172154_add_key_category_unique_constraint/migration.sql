/*
  Warnings:

  - A unique constraint covering the columns `[key,category]` on the table `Setting` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Setting_key_key";

-- AlterTable
ALTER TABLE "Setting" ALTER COLUMN "category" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Setting_key_category_key" ON "Setting"("key", "category");
