import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/AppError.js";

export async function savePart(app) {
  app.post("/save-part", async (request, reply) => {
    const { model, brand, type, state, amount } = request.body;

    if (!model || !brand || !type || !state) {
      throw new AppError("Preencha os campos.");
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
        model,
        brand,
        type,
        state,
        amount,
      },
    });

    return reply
      .status(201)
      .send({ message: "Peça salva com sucesso!", partId: part.id });
  });
}
