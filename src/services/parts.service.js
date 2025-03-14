import { prisma } from "../lib/prisma.js";

export class PartsService {
    async create(brand, model, type, state, quantity){
        return await prisma.part.create({
            data: {
              brand,
              model,
              type,
              state,
              quantity,
            },
          });
    }
    async getAll() {
        return await prisma.part.findMany({
            take: 10,
            orderBy: { createdAt: "desc" },
        });
    }

    async delete(id) {
       return await prisma.part.delete({
            where: {
              id,
            },
          });
    }

    async findQuantityById(id){
        return await prisma.part.findUnique({
          where: {
            id,
          },
          select: {
            quantity: true,
          }
          });
    }

    async findTypeAndModel(type, model){
      return await prisma.part.findFirst({
          where: {
            type,
            model
          },
        });
  }


    async findMany(brand, model, type) {
        return await prisma.part.findMany({
            select: {
              model: true,
              state: true,
              brand: true,
              quantity: true,
              type: true,
            },
            where: {
              brand: { contains: brand },
              model: { contains: model },
              type: { contains: type },
            },
            orderBy: {
              createdAt: "desc",
            },
          });
    }

    async updated(brand, model, type, state, quantity, id){
        return await prisma.part.update({
            data: {
              brand: brand,
              model: model,
              type: type,
              state: state,
              quantity: quantity,
            },
            where: {
              id,
            },
          });
    }
}