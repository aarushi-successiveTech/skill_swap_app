import { createExpressServer } from "./src/server/express.js";

const PORT = 4000;

const startServer = async () => {
  const httpServer = await createExpressServer();
  httpServer.listen(PORT, () => {
    console.log(`🚀 GraphQL server running at http://localhost:${PORT}/graphql`);
  });
};

startServer();