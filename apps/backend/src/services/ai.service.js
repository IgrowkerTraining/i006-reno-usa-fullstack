import prisma from '../lib/prisma.js';

const AI_BACKEND_URL = process.env.AI_BACKEND_URL || "http://localhost:8000/api/v1";

export const generateAndSaveReport = async (projectId) => {
  const latestLog = await prisma.dailyLog.findFirst({
    where: { phase: { projectId: projectId } },
    orderBy: { log_date: 'desc' },
    include: {
      phase: {
        include: {
          project: true,
          technicalApprovals: { orderBy: { approval_date: 'desc' }, take: 1, include: { user: true } }
        }
      },
      user: true,
      executedTasks: { include: { task: { include: { trade: true } } } },
      incidents: true,
      safetyMeasures: true,
      workerCoverages: { take: 1 }
    }
  });

  if (!latestLog) {
    throw new Error("No hay reportes diarios (DailyLogs) para este proyecto. No se puede generar el snapshot.");
  }

  //DTO
  const project = latestLog.phase.project;
  const techApproval = latestLog.phase.technicalApprovals[0];
  const workerCoverage = latestLog.workerCoverages[0];

  const snapshotDTO = {
    project_code: project.code,
    project_name: project.name,
    location: project.location,
    current_phase: latestLog.phase.name,
    phase_completion_percentage: latestLog.completion_percentage || 0,
    schedule_deviation_days: latestLog.schedule_deviation || 0,
    tasks_performed: latestLog.executedTasks.map(et => et.task.name),
    trades_on_site: [...new Set(latestLog.executedTasks.map(et => et.task.trade.name))],
    safety_measures: latestLog.safetyMeasures.map(sm => sm.description),
    worker_coverage: workerCoverage ? {
      status: workerCoverage.coverage_status,
      coverage_type: workerCoverage.coverage_type,
      policy_reference: workerCoverage.policy_reference
    } : { status: "Unknown", coverage_type: "Not Specified", policy_reference: "N/A" },
    technical_approval: techApproval ? {
      approval_date: techApproval.approval_date.toISOString().split('T')[0],
      approval_status: techApproval.status,
      licensed_professional: techApproval.user.name
    } : { approval_date: new Date().toISOString().split('T')[0], approval_status: "Pending", licensed_professional: "TBD" },
    supervisor_notes: latestLog.notes || "Sin observaciones.",
    incidents_reported: latestLog.incidents.length
  };

  //LLAMADA A LA IA
  const response = await fetch(`${AI_BACKEND_URL}/reportes/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ snapshot: snapshotDTO }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error del servicio de IA: ${JSON.stringify(errorData)}`);
  }

  const aiData = await response.json();

  //PERSISTENCIA
  const newSnapshot = await prisma.projectSnapshot.create({
    data: {
      projectId: projectId,
      period_label: "Reporte Generado por IA",
      aiReports: {
        create: {
          summary: JSON.stringify(aiData.analisis)
        }
      }
    },
    include: { aiReports: true }
  });

  return newSnapshot;
};