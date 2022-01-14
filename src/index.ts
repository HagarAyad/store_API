import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import dotenv from 'dotenv';
//---
import usersRoutes from './handlers/user';
import ordersRoutes from './handlers/order';
import productsRoutes from './handlers/product';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerDocument = require('../swagger.json');

dotenv.config();

const swaggerOptions = {
  explorer: true,
};

const PORT = 4000;

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerOptions),
);

usersRoutes(app);
productsRoutes(app);
ordersRoutes(app);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

export default app;
