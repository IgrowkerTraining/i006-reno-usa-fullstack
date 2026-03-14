-- DropForeignKey
ALTER TABLE "AIReport" DROP CONSTRAINT "AIReport_projectSnapshotId_fkey";

-- DropForeignKey
ALTER TABLE "DailyLog" DROP CONSTRAINT "DailyLog_phaseId_fkey";

-- DropForeignKey
ALTER TABLE "MaterialUsage" DROP CONSTRAINT "MaterialUsage_executedTaskId_fkey";

-- DropForeignKey
ALTER TABLE "Phase" DROP CONSTRAINT "Phase_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectSnapshot" DROP CONSTRAINT "ProjectSnapshot_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectTeamMember" DROP CONSTRAINT "ProjectTeamMember_projectId_fkey";

-- DropForeignKey
ALTER TABLE "SafetyMeasure" DROP CONSTRAINT "SafetyMeasure_dailyLogId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_phaseId_fkey";

-- DropForeignKey
ALTER TABLE "TaskExecution" DROP CONSTRAINT "TaskExecution_dailyLogId_fkey";

-- DropForeignKey
ALTER TABLE "TaskExecution" DROP CONSTRAINT "TaskExecution_taskId_fkey";

-- DropForeignKey
ALTER TABLE "TechnicalApproval" DROP CONSTRAINT "TechnicalApproval_phaseId_fkey";

-- DropForeignKey
ALTER TABLE "WorkerCoverage" DROP CONSTRAINT "WorkerCoverage_dailyLogId_fkey";

-- AddForeignKey
ALTER TABLE "ProjectTeamMember" ADD CONSTRAINT "ProjectTeamMember_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phase" ADD CONSTRAINT "Phase_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskExecution" ADD CONSTRAINT "TaskExecution_dailyLogId_fkey" FOREIGN KEY ("dailyLogId") REFERENCES "DailyLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskExecution" ADD CONSTRAINT "TaskExecution_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyLog" ADD CONSTRAINT "DailyLog_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SafetyMeasure" ADD CONSTRAINT "SafetyMeasure_dailyLogId_fkey" FOREIGN KEY ("dailyLogId") REFERENCES "DailyLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkerCoverage" ADD CONSTRAINT "WorkerCoverage_dailyLogId_fkey" FOREIGN KEY ("dailyLogId") REFERENCES "DailyLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalApproval" ADD CONSTRAINT "TechnicalApproval_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSnapshot" ADD CONSTRAINT "ProjectSnapshot_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIReport" ADD CONSTRAINT "AIReport_projectSnapshotId_fkey" FOREIGN KEY ("projectSnapshotId") REFERENCES "ProjectSnapshot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialUsage" ADD CONSTRAINT "MaterialUsage_executedTaskId_fkey" FOREIGN KEY ("executedTaskId") REFERENCES "TaskExecution"("id") ON DELETE CASCADE ON UPDATE CASCADE;
