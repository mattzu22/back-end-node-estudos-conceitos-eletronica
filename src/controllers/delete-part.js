import { PartsService } from "../services/parts.service.js";
import { AppError } from "../utils/AppError.js";

export async function deletePart(request, reply) {
    try {
      const { id } = request.params;

      const partsService = new PartsService();

      await partsService.delete(id);

      const arrayComRegistroDeletado = await partsService.getAll();

      return reply.status(200).send({
        newListParts: arrayComRegistroDeletado,
        message: "Peça deletada com sucesso.",
      });
    } catch (error) {
      throw new AppError("Error ao deletar a peça", 500);
    }
}
