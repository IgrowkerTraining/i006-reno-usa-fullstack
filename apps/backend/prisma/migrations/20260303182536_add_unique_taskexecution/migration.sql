/*
  Warnings:

  - You are about to drop the `ExecutedTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExecutedTask" DROP CONSTRAINT "ExecutedTask_dailyLogId_fkey";

-- DropForeignKey
ALTER TABLE "ExecutedTask" DROP CONSTRAINT "ExecutedTask_taskId_fkey";

-- DropForeignKey
ALTER TABLE "MaterialUsage" DROP CONSTRAINT "MaterialUsage_executedTaskId_fkey";

-- DropTable
DROP TABLE "ExecutedTask";

-- CreateTable
CREATE TABLE "TaskExecution" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "dailyLogId" TEXT NOT NULL,
    "progressPercentage" DOUBLE PRECISION,
    "notes" TEXT,
    "executedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskExecution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaskExecution_taskId_dailyLogId_key" ON "TaskExecution"("taskId", "dailyLogId");

-- AddForeignKey
ALTER TABLE "TaskExecution" ADD CONSTRAINT "TaskExecution_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskExecution" ADD CONSTRAINT "TaskExecution_dailyLogId_fkey" FOREIGN KEY ("dailyLogId") REFERENCES "DailyLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialUsage" ADD CONSTRAINT "MaterialUsage_executedTaskId_fkey" FOREIGN KEY ("executedTaskId") REFERENCES "TaskExecution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
