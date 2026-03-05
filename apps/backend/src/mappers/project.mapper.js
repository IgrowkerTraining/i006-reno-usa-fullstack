// src/mappers/project.mapper.js
import { mapTask } from "./task.mapper.js";

const mapPhase = (phase) => ({
  id: phase.id,
  name: phase.name,
  planned_start: phase.planned_start,
  planned_end: phase.planned_end,
  tasks: phase.tasks?.map(mapTask) || [],
});

export const mapProject = (project) => ({
  id: project.id,
  code: project.code,
  name: project.name,
  category: project.category,
  location: project.location,
  surface_sqft: project.surface_sqft,
  structure_type: project.structure_type,
  intervention_type: project.intervention_type,
  assigned_professional: project.assigned_professional,
  project_team: project.project_team || [],
  trades: project.trades || [],
  project_plan_photo: project.project_plan_photo,
  userId: project.userId,
  phases: project.phases?.map(mapPhase) || [],
  projectSnapshots: project.projectSnapshots || [],
});