import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RENO USA API",
      version: "1.0.0",
      description: "Project Management API with JWT Authentication",
    },
    servers: [
      { url: "http://localhost:3000" },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
      schemas: {
        // =========================
        // PROJECT SCHEMAS
        // =========================
        ProjectInput: {
          type: "object",
          required: ["name", "category", "location", "userId", "code"],
          properties: {
            name: { type: "string", example: "My New Project" },
            code: { type: "string", example: "RENO-US-2026-134" },
            category: { type: "string", example: "Residential Renovation" },
            location: { type: "string", example: "Barcelona" },
            surface_sqft: { type: "number", example: 1200 },
            structure_type: { type: "string", example: "Concrete" },
            intervention_type: { type: "string", example: "Renovation" },
            assigned_professional: { type: "string", example: "John Doe" },
            project_team: {
              type: "array",
              items: { type: "string" },
              example: ["Alice Smith", "Bob Johnson", "Carlos Ruiz"],
            },
            trades: {
              type: "array",
              items: { type: "string" },
              example: ["Electrician", "Plumber", "Mason"],
            },
            project_plan_photo: { type: "string", example: "https://cdn.igrowker.com/projects/renousa/project_plan.pdf" },
            userId: { type: "string", example: "cmmb72y5s00017bx0zagzffoi" },
          },
        },

        ProjectResponse: {
          type: "object",
          properties: {
            id: { type: "string", example: "cmmb7xdg900037bx0k4pfm2x2" },
            code: { type: "string", example: "RENO-US-2026-134" },
            name: { type: "string", example: "My New Project" },
            category: { type: "string", example: "Residential Renovation" },
            location: { type: "string", example: "Barcelona" },
            surface_sqft: { type: "number", example: 1200 },
            structure_type: { type: "string", example: "Concrete" },
            intervention_type: { type: "string", example: "Renovation" },
            assigned_professional: { type: "string", example: "John Doe" },
            project_team: {
              type: "array",
              items: { type: "string" },
              example: ["Alice Smith", "Bob Johnson", "Carlos Ruiz"],
            },
            trades: {
              type: "array",
              items: { type: "string" },
              example: ["Electrician", "Plumber", "Mason"],
            },
            project_plan_photo: { type: "string", example: "https://cdn.igrowker.com/projects/renousa/project_plan.pdf" },
            userId: { type: "string", example: "cmmb72y5s00017bx0zagzffoi" },
            phases: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string", example: "phase123" },
                  name: { type: "string", example: "Planning and Design" },
                  planned_start: { type: "string", format: "date-time", example: "2026-03-01T09:00:00Z" },
                  planned_end: { type: "string", format: "date-time", example: "2026-03-15T18:00:00Z" },
                  tasks: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string", example: "task123" },
                        name: { type: "string", example: "Needs definition" },
                        description: { type: "string", example: "Define requirements" },
                        status: { type: "string", example: "completed" },
                        record_history: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              completed_at: { type: "string", format: "date-time", example: "2026-03-01T09:00:00Z" },
                              completed_by: { type: "string", example: "Alice Smith" },
                              notes: { type: "string", example: "Requirements defined" },
                              photo_url: { type: "string", format: "uri", example: "https://cdn.igrowker.com/projects/renousa/photo1.jpg" },
                              duration: { type: "string", example: "2h 30m" },
                              additional_evidence: { type: "string", example: "Checked measurements and confirmed depth" },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            projectSnapshots: {
              type: "array",
              items: { type: "object" },
            },
          },
        },

        // =========================
        // TASK EXECUTION SCHEMAS
        // =========================
        TaskExecutionInput: {
          type: "object",
          required: ["taskId", "dailyLogId"],
          properties: {
            taskId: { type: "string", example: "task123" },
            dailyLogId: { type: "string", example: "log456" },
            progressPercentage: { type: "number", example: 50 }
          }
        },

        TaskExecutionResponse: {
          type: "object",
          properties: {
            id: { type: "string", example: "exec789" },
            taskId: { type: "string", example: "task123" },
            dailyLogId: { type: "string", example: "log456" },
            progressPercentage: { type: "number", example: 50 },
            task: { $ref: "#/components/schemas/ProjectResponse" }, // <-- corregido para incluir record_history
            dailyLog: { type: "object" },
          }
        },

        // =========================
        // USER / AUTH SCHEMAS
        // =========================
        RegisterInput: {
          type: "object",
          required: ["name", "email", "password", "role"],
          properties: {
            name: { type: "string", example: "Franco Lopez" },
            email: { type: "string", example: "franco@mail.com" },
            password: { type: "string", example: "12345678" },
            role: { type: "string", example: "user" },
            avatar: { type: "string", format: "uri", example: "https://picsum.photos/seed/franco@mail.com/200" },
          },
        },

        LoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "franco@mail.com" },
            password: { type: "string", example: "12345678" },
          },
        },

        ValidationError: {
          type: "object",
          properties: {
            errors: { type: "array", items: { type: "string" } },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;