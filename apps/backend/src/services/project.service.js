import prisma from "../lib/prisma.js";
import Project from "../models/Project.js";
import { mapProject } from "../mappers/project.mapper.js";

const projectFullInclude = {
  assignedProfessional: true,
  projectTeam: {
    include: {
      user: true,
    },
  },
  phases: {
    orderBy: {
      planned_start: 'asc', 
    },
    include: {
      tasks: {
        orderBy: {
          order: 'asc' 
        },
        include: {
          executedTasks: {
            include: {
              dailyLog: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      },
    },
  },
  projectSnapshots: true,
};
// const projectFullInclude = {
//   phases: {
//     include: {
//       tasks: {
//         include: {
//           executedTasks: {
//             include: {
//               dailyLog: {
//                 include: {
//                   user: true,
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//   },
//   projectSnapshots: true,
// };

export const createProject = async (data) => {
  const { name, location, surface_sqft, structure_type, intervention_type, internal_code, category, initial_status, assigned_professional, project_team, trades, project_plan_photo, userId } = data;

  const projectInstance = Project.create(data);
  const project = await prisma.project.create({
  data: {
    code: projectInstance.code,
    name,
    category,
    location,
    surface_sqft,
    structure_type,
    intervention_type,
    initial_status,
    project_plan_photo,
    trades: trades || [],

    user: {
      connect: { id: userId }
    },

    assignedProfessional: assigned_professional
      ? {
          connect: { id: assigned_professional }
        }
      : undefined,

    projectTeam: project_team?.length
      ? {
          create: project_team.map((memberId) => ({
            user: {
              connect: { id: memberId }
            }
          }))
        }
      : undefined
  }
});
  // const project = await prisma.project.create({
  //   data: {
  //     code: projectInstance.code,
  //     internal_code,
  //     name,
  //     category,
  //     location,
  //     surface_sqft,
  //     structure_type,
  //     intervention_type,
  //     initial_status,
  //     assigned_professional,
  //     project_team: project_team || [],
  //     trades: trades || [],
  //     project_plan_photo,
  //     userId,
  //   },
  // });

const defaultPhases = [
    {
      name: "Planning and Design",
      tasks: [
        { name: "Define requirements", category: "CORRECTION", tradeName: "Masonry" },
        { name: "Preliminary design", category: "CORRECTION", tradeName: "Masonry" },
        { name: "Architectural plans", category: "CORRECTION", tradeName: "Masonry" },
        { name: "Structural and installations plans", category: "CORRECTION", tradeName: "Masonry" },
        { name: "Estimated budget", category: "CORRECTION", tradeName: "Masonry" },
        { name: "Municipal permits", category: "CORRECTION", tradeName: "Masonry" }
      ]
    },
    {
      name: "Site Preparation",
      tasks: [
        { name: "Clearing and cleaning", category: "SAFETY", tradeName: "Masonry" }, 
        { name: "Leveling", category: "CORRECTION", tradeName: "Masonry" },
        { name: "Soil study", category: "SAFETY", tradeName: "Masonry" }, 
        { name: "Layout marking", category: "CORRECTION", tradeName: "Masonry" }
      ]
    },
    {
      name: "Foundation",
      tasks: [
        { name: "Excavation", category: "SAFETY", tradeName: "Masonry" }, 
        { name: "Footings and bases", category: "SAFETY", tradeName: "Masonry" },
        { name: "Foundation slab", category: "CORRECTION", tradeName: "Masonry" },
        { name: "Waterproofing", category: "CORRECTION", tradeName: "Masonry" }
      ]
    },
    {
      name: "Structure",
      tasks: [
        { name: "Columns and beams", category: "SAFETY", tradeName: "Masonry" }, 
        { name: "Slab construction", category: "SAFETY", tradeName: "Masonry" },
        { name: "Load-bearing walls", category: "SAFETY", tradeName: "Masonry" },
        { name: "Roof structure", category: "SAFETY", tradeName: "Masonry" } 
      ]
    },
    {
      name: "Installations",
      tasks: [
        { name: "Electrical installation", category: "ELECTRICAL", tradeName: "Electrician" },
        { name: "Plumbing installation", category: "CORRECTION", tradeName: "Plumbing" },
        { name: "Gas installation", category: "SAFETY", tradeName: "Plumbing" }, 
        { name: "Drainage", category: "CORRECTION", tradeName: "Plumbing" },
        { name: "Rainwater system", category: "CORRECTION", tradeName: "Plumbing" }
      ]
    },
    {
      name: "Masonry and Enclosures",
      tasks: [
        { name: "Wall construction", category: "CORRECTION", tradeName: "Masonry" },
        { name: "Window and door installation", category: "CORRECTION", tradeName: "Masonry" },
        { name: "Rough plaster", category: "CORRECTION", tradeName: "Masonry" },
        { name: "Fine plaster", category: "CORRECTION", tradeName: "Masonry" }
      ]
    },
    {
      name: "Roofing and Insulation",
      tasks: [
        { name: "Roof covering installation", category: "SAFETY", tradeName: "Masonry" }, 
        { name: "Thermal insulation", category: "CORRECTION", tradeName: "Masonry" },
        { name: "Waterproof insulation", category: "CORRECTION", tradeName: "Masonry" }
      ]
    },
    {
      name: "Finishes",
      tasks: [
        { name: "Flooring and wall coverings", category: "CORRECTION", tradeName: "Masonry" },
        { name: "Painting", category: "CORRECTION", tradeName: "Masonry" },
        { name: "Interior carpentry", category: "CORRECTION", tradeName: "Masonry" },
        { name: "Fixture installation", category: "CORRECTION", tradeName: "Electrician" },
        { name: "Sanitary fittings", category: "CORRECTION", tradeName: "Plumbing" }
      ]
    },
    {
      name: "Inspection and Final Details",
      tasks: [
        { name: "Quality control", category: "CORRECTION", tradeName: "Masonry" },
        { name: "Fixing defects", category: "CORRECTION", tradeName: "Masonry" },
        { name: "Final cleaning", category: "CORRECTION", tradeName: "Masonry" }
      ]
    }
  ];

let currentStartDate = new Date();

for (const phaseData of defaultPhases) {
  
  const durationInDays = 7;
  const currentEndDate = new Date(currentStartDate.getTime() + durationInDays * 86400000);

  const phase = await prisma.phase.create({
    data: {
      name: phaseData.name,
      projectId: project.id,
      planned_start: currentStartDate, 
      planned_end: currentEndDate,     
      status: "pending"
    }
  });

  currentStartDate = new Date(currentEndDate);

  for (const [index, taskData] of phaseData.tasks.entries()) {
    let assignedTradeId = null;
    
    if (taskData.tradeName) {
      let tradeRecord = await prisma.trade.findFirst({
        where: { name: taskData.tradeName }
      });
      
      if (!tradeRecord) {
        tradeRecord = await prisma.trade.create({
          data: { name: taskData.tradeName }
        });
      }
      
      assignedTradeId = tradeRecord.id; 
    }

    await prisma.task.create({
      data: {
        name: taskData.name,
        category: taskData.category, 
        order: index + 1,       
        is_incidence: false,     
        phaseId: phase.id,
        tradeId: assignedTradeId 
      }
    });
  }

  // (Esto posiblemente se vaya pronto)
  await prisma.dailyLog.create({
    data: {
      phaseId: phase.id,
      userId,
      notes: "DailyLog inicial generado automáticamente",
      log_date: currentStartDate,
      completion_percentage: 0,
      schedule_deviation: 0,
    },
  });
}

const projectWithPhases = await prisma.project.findUnique({
  where: { id: project.id },
  include: projectFullInclude,
});

return mapProject(projectWithPhases);
}

export const getProjects = async (userId) => {
  // 1. Buscamos los proyectos donde el usuario participe de CUALQUIER forma
  const projects = await prisma.project.findMany({
    where: {
      OR: [
        { userId: userId },
        { assignedProfessionalId: userId }, 
        {
          projectTeam: {
            some: {
              userId: userId 
            }
          }
        }
      ]
    },
    include: {
      phases: {
        orderBy: { planned_start: 'asc' },
        include: {
          tasks: {
            select: {
              status: true,
              is_incidence: true,
              category: true
            }
          }
        }
      }
    }
  });

  // 2. Mapeamos y calculamos el estado dinámico
  const formattedProjects = projects.map(project => {
    const activeIncidenceCategories = new Set();
    let projectStatus = "In planning"; // Estado por defecto
    
    const totalPhases = project.phases.length;

    if (totalPhases > 0) {
      // Buscamos cuál es la PRIMERA fase que todavía tiene tareas sin terminar
      const currentPhaseIndex = project.phases.findIndex(phase => 
        phase.status !== 'completed'
      );

      if (currentPhaseIndex === -1) {

        projectStatus = "Completed"; 
      } else if (currentPhaseIndex === 0) {
  
        projectStatus = "In planning";
      } else if (currentPhaseIndex === totalPhases - 1) {
  
        projectStatus = "Closing";
      } else {
  
        projectStatus = "In execution";
      }
    }

    // 3. Recolectamos las incidencias
    project.phases.forEach(phase => {
      phase.tasks.forEach(task => {
        if (task.is_incidence && task.status !== 'completed' && task.category) {
          activeIncidenceCategories.add(task.category);
        }
      });
    });

    return {
      id: project.id,
      name: project.name,
      status: projectStatus,
      activeIncidences: Array.from(activeIncidenceCategories)
    };
  });

  return formattedProjects;
};

export const getProjectById = async (id) => {
  const project = await prisma.project.findUnique({
    where: { id: id }, 
    include: projectFullInclude,
  });

  if (!project) return null;
  return mapProject(project);
};

export const updateProject = async (id, userId, data) => {
  const existing = await prisma.project.findFirst({ where: { id, userId } });
  if (!existing) return null;

  const updated = await prisma.project.update({
    where: { id },
    data,
    include: projectFullInclude,
  });

  return mapProject(updated);
};

export const deleteProject = async (id, userId) => {
  const existing = await prisma.project.findFirst({ where: { id, userId } });
  if (!existing) return null;

  return await prisma.project.delete({ where: { id } });
};

export const getDashboardMetrics = async (projectId) => {
  // 1. VERIFICAR QUE EL PROYECTO EXISTA
  const project = await prisma.project.findUnique({
    where: { id: projectId }
  });

  if (!project) return null; // Devuelve null si no existe para que el controller tire 404

  // 2. OBTENER FECHAS DESDE LAS FASES
  const phaseDates = await prisma.phase.aggregate({
    where: { projectId: projectId },
    _min: { planned_start: true },
    _max: { planned_end: true }
  });

  const startDate = phaseDates._min.planned_start;
  const endDate = phaseDates._max.planned_end;

  let totalDays = 0;
  let daysPassed = 0;

  if (startDate && endDate) {
    const today = new Date();
    const totalDurationMs = endDate.getTime() - startDate.getTime();
    const elapsedMs = today.getTime() - startDate.getTime();
    
    totalDays = Math.max(1, Math.ceil(totalDurationMs / (1000 * 60 * 60 * 24)));
    const rawElapsed = Math.ceil(elapsedMs / (1000 * 60 * 60 * 24));
    daysPassed = Math.max(0, Math.min(rawElapsed, totalDays));
  }

  // 3. PROGRESO DE TAREAS (% Advance)
  const totalTasks = await prisma.task.count({
    where: { phase: { projectId } }
  });

  const completedTasks = await prisma.task.count({
    where: { 
      phase: { projectId },
      status: 'completed' 
    }
  });

  const advancePercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // 4. ACTIVE TRADES (Oficios con tareas pendientes)
  const pendingTasks = await prisma.task.findMany({
    where: {
      phase: { projectId },
      tradeId: { not: null }
    },
    select: {
      trade: {
        select: { id: true, name: true }
      }
    }
  });

  const activeTradesMap = new Map();
  pendingTasks.forEach(task => {
    if (task.trade) {
      activeTradesMap.set(task.trade.id, task.trade);
    }
  });
  const activeTrades = Array.from(activeTradesMap.values());

  // 5. DEVOLVEMOS LOS DATOS AL CONTROLADOR
  return {
    duration: {
      totalDays,
      elapsedDays: daysPassed,
      remainingDays: totalDays - daysPassed,
      startDate,
      endDate
    },
    progress: {
      advancePercentage,
      totalTasks,
      completedTasks
    },
    activeTrades
  };
};

export const getProjectPhases = async (projectId) => {
  const phases = await prisma.phase.findMany({
    where: { projectId: projectId },
    orderBy: {
      planned_start: 'asc' 
    },
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
      planned_start: true,
      planned_end: true
    }
  });

  return phases;
};

export const getProjectHistory = async (projectId, userId) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId }
  });

  if (!project) return []; 

  const history = await prisma.task.findMany({
    where: {
      status: 'completed',
      completedAt: { not: null },
      phase: {
        projectId: projectId 
      }
    },
    orderBy: {
      completedAt: 'desc' 
    },
    
    select: {
      id: true,
      name: true,
      completedAt: true,
      completedBy: true,
      trade: {
        select: { name: true }
      },
      phase: {
        select: { name: true }
      }
    }
  });

  return history;
};