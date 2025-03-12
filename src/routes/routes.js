import partRoutes from "./parts.routes.js";

export default async function routes(fastify) {
    fastify.register(partRoutes, { prefix: "/parts" });
}