/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `category` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'PROFESSIONAL', 'ADMIN');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "assigned_professional" TEXT,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "initial_status" TEXT,
ADD COLUMN     "project_plan_photo" TEXT,
ADD COLUMN     "project_team" TEXT[],
ADD COLUMN     "trades" TEXT[],
ALTER COLUMN "surface_sqft" DROP NOT NULL,
ALTER COLUMN "structure_type" DROP NOT NULL,
ALTER COLUMN "intervention_type" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
