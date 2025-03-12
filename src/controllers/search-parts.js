
import { PartsService } from "../services/parts.service.js";
import { AppError } from "../utils/AppError.js";

export async function searchParts(request, reply) {
    const { brand, model } = request.query;

    const partsService = new PartsService();

    if (!brand && !model) {
      return reply
        .status(400)
        .send(new AppError("Preencha pelo menos um campo.", 400));
    }

    try {
      const parts = await partsService.findMany(brand, model)

      if (parts.length === 0) {
        return reply
          .status(404)
          .send(new AppError("Peça não encontrada.", 404));
      }

      return reply.status(200).send(parts);
    } catch (error) {
      return reply.status(500).send(new AppError("Erro no servidor.", 500));
    }
}
