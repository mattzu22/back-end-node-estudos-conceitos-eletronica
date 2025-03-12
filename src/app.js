import fastify from "fastify";
import fastifyCors from "@fastify/cors";

import routes  from "./routes/routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = fastify();

app.register(routes);

app.setErrorHandler(errorHandler)

app.register(fastifyCors, {
  origin: "*",
});

app.listen({ port: 3334, host: "0.0.0.0" }).then(() => {
  console.log("Server is Runnig");
});
