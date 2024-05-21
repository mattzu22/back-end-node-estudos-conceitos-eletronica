import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/AppError.js";

export async function searchParts(app) {
  app.get("/search-parts", async (request, reply) => {
    const { brand, model } = request.query;

    if (brand | (model === undefined)) {
      throw new AppError("Preencha os campos.");
    }

    const parts = await prisma.part.findMany({
      select: {
        model: true,
        state: true,
        brand: true,
        quantity: true,
        type: true,
      },
      where: {
        brand,
        model,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (parts.length === 0) {
      throw new AppError("Peça não encontrada.", 404);
    }

    return reply.send(parts);
  });
}
