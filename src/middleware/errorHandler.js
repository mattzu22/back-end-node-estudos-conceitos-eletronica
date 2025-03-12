import  { AppError } from "../utils/AppError.js";

export function errorHandler(error, request, reply){

    if(error instanceof AppError){
        return reply.status(error.statusCode).send({ message: error.message });
    }

    console.error("error interno", error);
    return reply.status(500).send({ message: "Ocorreu um erro inesperado." });
}