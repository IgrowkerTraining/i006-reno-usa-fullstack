// src/swagger.js
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RENO USA API",
      version: "1.0.0",
      description: "Project Management API with JWT Authentication",
    },
    servers: [{ url: "http://localhost:3000" }],
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
          required: ["name", "category", "location", "userId", "code", "project_team", "trades"],
          properties: {
            name: { type: "string", example: "Reno USA Main Project" },
            code: { type: "string", example: "RENO-US-2026" },
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
            project_plan_photo: {
              type: "string",
              example: "https://cdn.igrowker.com/projects/renousa/project_plan.pdf",
            },
            userId: { type: "string", example: "cmmb72y5s00017bx0zagzffoi" },
          },
        },
        ProjectResponse: {
          type: "object",
          properties: {
            id: { type: "string", example: "cmmb7xdg900037bx0k4pfm2x2" },
            code: { type: "string", example: "RENO-US-2026" },
            name: { type: "string", example: "Reno USA Main Project" },
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
            project_plan_photo: {
              type: "string",
              example: "https://cdn.igrowker.com/projects/renousa/project_plan.pdf",
            },
            userId: { type: "string", example: "cmmb72y5s00017bx0zagzffoi" },
            phases: {
              type: "array",
              items: { type: "object" },
            },
            projectSnapshots: {
              type: "array",
              items: { type: "object" },
            },
          },
        },

        // =========================
        // TASK SCHEMAS
        // =========================
        TaskResponse: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            status: { type: "string" },
            record_history: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  completed_at: { type: "string", format: "date-time" },
                  completed_by: { type: "string" },
                  notes: { type: "string" },
                  photo_url: { type: "string" },
                  duration: { type: "number" },
                  additional_evidence: { type: "string" },
                },
              },
            },
          },
        },
        TaskExecutionInput: {
          type: "object",
          required: ["taskId", "dailyLogId"],
          properties: {
            taskId: { type: "string", example: "task123" },
            dailyLogId: { type: "string", example: "log456" },
            progressPercentage: { type: "number", example: 50 },
          },
        },
        TaskExecutionResponse: {
          type: "object",
          properties: {
            id: { type: "string", example: "exec789" },
            taskId: { type: "string", example: "task123" },
            dailyLogId: { type: "string", example: "log456" },
            progressPercentage: { type: "number", example: 50 },
            task: { $ref: "#/components/schemas/TaskResponse" },
            dailyLog: { type: "object" },
          },
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

        // =========================
        // VALIDATION ERROR SCHEMA
        // =========================
        ValidationError: {
          type: "object",
          properties: {
            errors: {
              type: "array",
              items: { type: "string" },
              example: ["taskId is required", "dailyLogId is required"],
            },
          },
        },

        // =========================
        // DAILY LOG SCHEMAS
        // =========================
        DailyLogInput: {
          type: "object",
          required: ["phaseId", "userId"],
          properties: {
            phaseId: { type: "string", example: "cmmb7xdg900037bx0k4pfm2x2" },
            userId: { type: "string", example: "cmmb72y5s00017bx0zagzffoi" },
            notes: { type: "string", example: "Checked progress, 50% complete." },
            log_date: { type: "string", format: "date-time", example: "2026-03-05T10:30:00Z" },
            completion_percentage: { type: "number", example: 50 },
            schedule_deviation: { type: "number", example: -2 },
          },
        },
        DailyLogResponse: {
          type: "object",
          properties: {
            id: { type: "string", example: "cmmb7xdg900037bx0k4pfm2x2" },
            userId: { type: "string" },
            phaseId: { type: "string" },
            notes: { type: "string" },
            log_date: { type: "string", format: "date-time" },
            completion_percentage: { type: "number" },
            schedule_deviation: { type: "number" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },

        // =========================
        // TRADE SCHEMAS
        // =========================
        TradeInput: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string" },
            description: { type: "string" },
          },
        },
        TradeResponse: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // donde están los endpoints documentados
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;