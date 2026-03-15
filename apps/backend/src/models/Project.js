class Project {
  constructor({
    id,
    code,
    internal_code,
    name,
    category,
    location,
    surface_sqft,
    structure_type,
    intervention_type,
    initial_status,
    assigned_professional,
    project_team,
    trades,
    project_plan_photo,
    userId,
  }) {
    this.id = id;
    this.code = code;
    this.internal_code = internal_code;
    this.name = name;
    this.category = category;
    this.location = location;
    this.surface_sqft = surface_sqft;
    this.structure_type = structure_type;
    this.intervention_type = intervention_type;
    this.initial_status = initial_status;
    this.assigned_professional = assigned_professional;
    this.project_team = project_team || [];
    this.trades = trades || [];
    this.project_plan_photo = project_plan_photo;
    this.userId = userId;
  }

  toJSON() {
    return {
      id: this.id,
      code: this.code,
      internal_code: this.internal_code,
      name: this.name,
      category: this.category,
      location: this.location,
      surface_sqft: this.surface_sqft,
      structure_type: this.structure_type,
      intervention_type: this.intervention_type,
      initial_status: this.initial_status,
      assigned_professional: this.assigned_professional,
      project_team: this.project_team,
      trades: this.trades,
      project_plan_photo: this.project_plan_photo,
      userId: this.userId,
    };
  }

  static create(projectData) {
    const currentYear = new Date().getFullYear();

    return new Project({
      ...projectData,
      code: `RENO-US-${currentYear}-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      project_team: projectData.project_team || [],
      trades: projectData.trades || [],
    });
  }
}

export default Project;