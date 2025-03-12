import { AppError } from "../utils/AppError.js";
import { PartsService } from "../services/parts.service.js";

export async function listParts(request, reply) {
    try {
      const partsService = new PartsService();
      const parts = await partsService.getAll();

      if (parts === undefined) {
        throw new AppError("Nem uma placa registrada.");
      }

      return reply.status(200).send(parts);
    } catch (error) {
      throw new AppError("Error ao listar as peças", 500)
    }
}
