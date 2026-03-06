// src/mappers/project.mapper.js
import { mapTask } from "./task.mapper.js";

/* =========================
   Mapper de fases
========================= */
const mapPhase = (phase) => ({
  id: phase.id,
  name: phase.name,
  planned_start: phase.planned_start,
  planned_end: phase.planned_end,
  status: phase.status,
  tasks: phase.tasks?.map(mapTask) || [],
});

/* =========================
   Mapper de proyecto
========================= */
export const mapProject = (project) => ({
  id: project.id,
  code: project.code,
  name: project.name,
  category: project.category,
  location: project.location,
  surface_sqft: project.surface_sqft,
  structure_type: project.structure_type,
  intervention_type: project.intervention_type,
  initial_status: project.initial_status || "draft", // 🔹 valor por defecto

  // 🔹 assigned_professional con trade y avatar
  assigned_professional: project.assigned_professional
    ? {
        id: project.assigned_professional.id,
        name: project.assigned_professional.name,
        role: project.assigned_professional.role,
        trade: project.assigned_professional.trade || null,
        avatar: project.assigned_professional.avatar || null,
      }
    : null,

  // 🔹 mapear project_team con trade y avatar
  project_team: project.project_team?.map((member) => ({
    id: member.id,
    name: member.name,
    role: member.role,
    trade: member.trade || null,
    avatar: member.avatar || null,
  })) || [],

  trades: project.trades || [],
  project_plan_photo: project.project_plan_photo,
  userId: project.userId,

  phases: project.phases?.map(mapPhase) || [],
  projectSnapshots: project.projectSnapshots || [],
});