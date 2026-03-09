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
        "Define requirements",
        "Preliminary design",
        "Architectural plans",
        "Structural and installations plans",
        "Estimated budget",
        "Municipal permits"
      ]
    },
    {
      name: "Site Preparation",
      tasks: [
        "Clearing and cleaning",
        "Leveling",
        "Soil study",
        "Layout marking"
      ]
    },
    {
      name: "Foundation",
      tasks: [
        "Excavation",
        "Footings and bases",
        "Foundation slab",
        "Waterproofing"
      ]
    },
    {
      name: "Structure",
      tasks: [
        "Columns and beams",
        "Slab construction",
        "Load-bearing walls",
        "Roof structure"
      ]
    },
    {
      name: "Installations",
      tasks: [
        "Electrical installation",
        "Plumbing installation",
        "Gas installation",
        "Drainage",
        "Rainwater system"
      ]
    },
    {
      name: "Masonry and Enclosures",
      tasks: [
        "Wall construction",
        "Window and door installation",
        "Rough plaster",
        "Fine plaster"
      ]
    },
    {
      name: "Roofing and Insulation",
      tasks: [
        "Roof covering installation",
        "Thermal insulation",
        "Waterproof insulation"
      ]
    },
    {
      name: "Finishes",
      tasks: [
        "Flooring and wall coverings",
        "Painting",
        "Interior carpentry",
        "Fixture installation",
        "Sanitary fittings"
      ]
    },
    {
      name: "Inspection and Final Details",
      tasks: [
        "Quality control",
        "Fixing defects",
        "Final cleaning"
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

    for (const taskName of phaseData.tasks) {
      await prisma.task.create({
        data: {
          name: taskName,
          phaseId: phase.id,
          tradeId: null
        }
      });
    }

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