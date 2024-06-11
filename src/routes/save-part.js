import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/AppError.js";

export async function savePart(app) {
  app.post("/save-part", async (request, reply) => {
    let { brand, model, type, state, quantity} = request.body;

    state = state || "Não definido";
    quantity = quantity || 1;

    if (!model || !brand || !type ) {
      throw new AppError("Preencha os campos.");
    }

    if (model.length > 50 || brand.length > 50 || type.length > 50) {
      throw new AppError("Os campos podem ter no máximo 50 caracteres.");
    }

    if (typeof quantity !== "number") {
      throw new AppError("O campo precisa ser um valor válido.")
    }

    const existingModel = await prisma.part.findFirst({
      where: {
        model: model,
      },
    });

    if (existingModel) {
      throw new AppError("Modelo já cadastrado.");
    }

    const part = await prisma.part.create({
      data: {
        brand,
        model,
        type,
        state,
        quantity,
      },
    });

    return reply
      .status(201)
      .send({ message: "Peça salva com sucesso!", partId: part.id });
  });
}
