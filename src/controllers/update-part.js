import { PartsService } from "../services/parts.service.js";
import { AppError } from "../utils/AppError.js";

export async function updatePart(request, reply) {
    const { brand, model, type, state, quantity, id } = request.body;
    
    const partsService = new PartsService();

    if (!brand && !model && !type && !state && !quantity){
        throw new AppError("Pelo menos um campo deve ser preenchido para atualizar.", 400);
      }

    if (model?.length > 50 || brand?.length > 50 || type?.length > 50) {
      throw new AppError("Os campos podem ter no máximo 50 caracteres.", 400);
    }

    if (typeof quantity !== "number" && typeof quantity !== "undefined") {
      throw new AppError("O campo precisa ser um valor válido.", 400);
    }

    try {
      const partUpdated = await partsService.updated(brand, model, type, state, quantity, id)

      return reply.send({ message: "Peça atualizada!", partUpdated });
    } catch (error) {
      throw new AppError("Erro ao atualizar a peça: " + error.message);
    }
}
