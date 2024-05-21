import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/AppError.js";

export async function deletaPart(app) {
  app.delete("/delete-part/:id", async (request, reply) => {
    try {
      const { id } = request.params;

      await prisma.part.delete({
        where: {
          id,
        },
      });

      const arrayComRegistroDeletado = await prisma.part.findMany({
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
      });

      return reply.status(200).send({
        newListParts: arrayComRegistroDeletado,
        message: "Peça deletada com sucesso.",
      });
    } catch (error) {
      throw new AppError("Error ao deletar a peça", 500);
    }
  });
}
