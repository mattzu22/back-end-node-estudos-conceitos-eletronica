import { PartsService } from "../services/parts.service.js";
import { AppError } from "../utils/AppError.js";

export async function updatePart(request, reply) {
    const { brand, model, type, state, quantity, id } = request.body;
    
    const partsService = new PartsService();

    let variableQuantity = quantity || 0;

    if (!brand && !model && !type && !state && !variableQuantity){
        throw new AppError("Pelo menos um campo deve ser preenchido para atualizar.", 400);
      }

    if (model?.length > 50 || brand?.length > 50 || type?.length > 50) {
      throw new AppError("Os campos podem ter no máximo 50 caracteres.", 400);
    }

    if (typeof variableQuantity !== "number" && typeof variableQuantity !== "undefined") {
      throw new AppError("O campo precisa ser um valor válido.", 400);
    }

    try {
      const quantityNow = await partsService.findQuantityById(id);
      let newQuantity = quantityNow.quantity + variableQuantity;

      const partUpdated = await partsService.updated(brand, model, type, state, newQuantity, id)

      return reply.send({ message: "Peça atualizada!", partUpdated });
    } catch (error) {
      throw new AppError("Erro ao atualizar a peça: " + error.message);
    }
}
