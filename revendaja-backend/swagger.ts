// src/config/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Revendaja API',
    version: '1.0.0',
    description: 'API usando Express, Node e TypeScript',
  },
  servers: [
    {
      url: 'http://localhost:9999',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const options: swaggerJSDoc.Options = {
  swaggerDefinition,
  apis: ['./src/docs/user/*.ts', './src/docs/product/*.ts', './src/docs/stripe/*.ts'], // ajusta pro caminho das suas rotas
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
