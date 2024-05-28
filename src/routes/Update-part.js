import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/AppError.js";

export async function updatePart(app) {
  app.put("/update-part", async (request, reply) => {
    const { brand, model, type, state, quantity, id } = request.body;

    if (!brand && !model && !type && !state && !quantity){
        throw new AppError("Pelo menos um campo deve ser preenchido para atualizar.");
      }


    const existingModel = await prisma.part.findFirst({
        where: {
          model: model,
        },
      });
  
      if (existingModel) {
        throw new AppError("Você está tentando cadastrar o mesmo modelo ou um modelo já existente.");
      }
  

    if (model?.length > 50 || brand?.length > 50 || type?.length > 50) {
      throw new AppError("Os campos podem ter no máximo 50 caracteres.");
    }

    if (typeof quantity !== "number" && typeof quantity !== "undefined") {
      throw new AppError("O campo precisa ser um valor válido.");
    }

    try {
      const partUpdated = await prisma.part.update({
        data: {
          brand,
          model,
          type,
          state,
          quantity,
        },
        where: {
          id,
        },
      });

      return reply.send({ message: "Peça atualizada!", partUpdated });
    } catch (error) {
      throw new AppError("Erro ao atualizar a peça: " + error.message);
    }
  });
}
