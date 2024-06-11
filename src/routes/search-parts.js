import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/AppError.js";

export async function searchParts(app) {
  app.get("/search-parts", async (request, reply) => {
    const { brand, model } = request.query;

    if (!brand && !model) {
      return reply
        .status(400)
        .send(new AppError("Preencha pelo menos um campo.", 400));
    }

    try {
      const parts = await prisma.part.findMany({
        select: {
          model: true,
          state: true,
          brand: true,
          quantity: true,
          type: true,
        },
        where: {
          ...(brand && { brand: { contains: brand } }),
          ...(model && { model: { contains: model } }),
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (parts.length === 0) {
        return reply
          .status(404)
          .send(new AppError("Peça não encontrada.", 404));
      }

      return reply.status(200).send(parts);
    } catch (error) {
      console.error("Erro no servidor:", error);
      return reply.status(500).send(new AppError("Erro no servidor.", 500));
    }
  });
}
