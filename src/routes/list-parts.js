import { AppError } from "../utils/AppError.js";
import { prisma } from "../lib/prisma.js";

export async function listParts(app) {
  app.get("/list-parts", async (request, reply) => {
    try {
      const parts = await prisma.part.findMany({
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
      });

      if (parts === undefined) {
        throw new AppError("Nem uma placa registrada.");
      }

      return reply.status(200).send(parts);
    } catch (error) {
      throw new AppError("Error ao listar as peças", 500)
    }
  });
}
