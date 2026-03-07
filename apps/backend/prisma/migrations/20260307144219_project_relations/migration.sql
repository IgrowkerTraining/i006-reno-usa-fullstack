/*
  Warnings:

  - You are about to drop the column `assigned_professional` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `project_team` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "assigned_professional",
DROP COLUMN "project_team",
ADD COLUMN     "assignedProfessionalId" TEXT;

-- CreateTable
CREATE TABLE "ProjectTeamMember" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ProjectTeamMember_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectTeamMember" ADD CONSTRAINT "ProjectTeamMember_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTeamMember" ADD CONSTRAINT "ProjectTeamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_assignedProfessionalId_fkey" FOREIGN KEY ("assignedProfessionalId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
