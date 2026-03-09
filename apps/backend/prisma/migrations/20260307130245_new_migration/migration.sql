-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_tradeId_fkey";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "tradeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "Trade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
