const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Storyn Bookstore API",
      version: "1.0.0",
      description: "API Documentation for Storyn Bookstore Backend",
    },
    servers: [
      {
        url: "http://localhost:3007",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;