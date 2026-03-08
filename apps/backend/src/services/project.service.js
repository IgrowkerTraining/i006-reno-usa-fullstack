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
    include: {
      tasks: {
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

  if (!name || !location || !userId) {
    throw new Error("Missing required fields");
  }

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
          create: project_team.map((userId) => ({
            user: {
              connect: { id: userId }
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

const now = new Date();

for (const phaseData of defaultPhases) {
  const phase = await prisma.phase.create({
    data: {
      name: phaseData.name,
      projectId: project.id,
      planned_start: now,
      planned_end: new Date(now.getTime() + 7 * 86400000),
      status: "pending"
    }
  });

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
      log_date: now,
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
  const projects = await prisma.project.findMany({
    where: { userId },
    include: projectFullInclude,
  });
  return projects.map(mapProject);
};

export const getProjectById = async (id, userId) => {
  const project = await prisma.project.findFirst({
    where: { id, userId },
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