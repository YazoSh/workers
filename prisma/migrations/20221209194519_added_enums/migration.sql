/*
  Warnings:

  - Changed the type of `careerLevel` on the `jobs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CareerLevel" AS ENUM ('Entry', 'Intermediate', 'Senior');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "careerLevel",
ADD COLUMN     "careerLevel" "CareerLevel" NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'user';
