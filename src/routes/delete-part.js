import { readFile } from "fs";

export async function deletaPart(app){
    app.delete("/delete-part/:id", (request, reply) => {
        readFile("db-placas.txt", "utf-8", (err, data) => {
          const { id } = request.params;
      
          const registros = data.split("\n");
      
          if (registros[registros.length - 1] === "") {
            registros.pop();
          }
      
          const registrosJson = registros.map((reg) => JSON.parse(reg));
      
          const novoArrayComregsitroDeletado = registrosJson.filter(
            (reg) => reg.id !== id
          );
      
          return reply.send(novoArrayComregsitroDeletado);
        });
      });
      
}