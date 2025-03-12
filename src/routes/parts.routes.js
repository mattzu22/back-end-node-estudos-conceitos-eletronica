import { listParts } from "../controllers/list-parts.js"
import { searchParts } from "../controllers/search-parts.js" 
import { deletePart } from "../controllers/delete-part.js"
import { savePart } from "../controllers/save-part.js"
import { updatePart } from "../controllers/update-part.js"

export default async function partRoutes(fastify) {
    fastify.get("/list-parts", listParts);
    fastify.get("/search", searchParts);
    fastify.delete("/:id", deletePart);
    fastify.post("/", savePart);
    fastify.patch("/", updatePart);
}