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
      {
        url: "http://localhost:3000",
      },
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
        /* =========================
           AUTH
        ========================= */

        RegisterInput: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              example: "Juan Pérez",
            },
            email: {
              type: "string",
              format: "email",
              example: "juan@example.com",
            },
            password: {
              type: "string",
              minLength: 6,
              example: "123456",
            },
            role: {
              type: "string",
              example: "user",
            },
          },
        },

        LoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "juan@example.com",
            },
            password: {
              type: "string",
              example: "123456",
            },
          },
        },

        ValidationError: {
          type: "object",
          properties: {
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: { type: "string" },
                  message: { type: "string" },
                },
              },
            },
          },
        },

        /* =========================
           PROJECT
        ========================= */

        ProjectInput: {
          type: "object",
          required: ["name", "location"],
          properties: {
            name: {
              type: "string",
              example: "Building Renovation",
            },
            location: {
              type: "string",
              example: "New York",
            },
            surface_sqft: {
              type: "number",
              example: 1500,
            },
            structure_type: {
              type: "string",
              example: "Concrete",
            },
            intervention_type: {
              type: "string",
              example: "Remodel",
            },
          },
        },

        ProjectResponse: {
          type: "object",
          properties: {
            id: { type: "string" },
            code: { type: "string" },
            name: { type: "string" },
            location: { type: "string" },
            surface_sqft: { type: "number" },
            structure_type: { type: "string" },
            intervention_type: { type: "string" },
          },
        },
      },
    },
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;