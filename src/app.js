import fastify from "fastify";
import fastifyCors from "@fastify/cors";

import { savePart } from "./routes/save-part.js";
import { listParts } from "./routes/list-parts.js";
import { searchParts } from "./routes/search-parts.js";
import { deletaPart } from "./routes/delete-part.js";

const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});

app.register(savePart);
app.register(listParts);
app.register(searchParts);
app.register(deletaPart);

app.listen({ port: 3334, host: "0.0.0.0" }).then(() => {
  console.log("Server is Runnig");
});
