/*
  Warnings:

  - The values [Entry,Intermediate,Senior] on the enum `CareerLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CareerLevel_new" AS ENUM ('entry', 'intermediate', 'senior');
ALTER TABLE "jobs" ALTER COLUMN "careerLevel" TYPE "CareerLevel_new" USING ("careerLevel"::text::"CareerLevel_new");
ALTER TYPE "CareerLevel" RENAME TO "CareerLevel_old";
ALTER TYPE "CareerLevel_new" RENAME TO "CareerLevel";
DROP TYPE "CareerLevel_old";
COMMIT;
