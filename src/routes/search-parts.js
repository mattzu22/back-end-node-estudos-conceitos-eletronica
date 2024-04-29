import { readFile } from "fs";

export async function searchParts(app){
    app.get("/search-parts", (request, reply) => {
        const { modelo, marca } = request.query;
      
        readFile("db-placas.txt", "utf-8", (err, data) => {
          const registros = data.split("\n");
      
          if (registros[registros.length - 1] === "") {
            registros.pop();
          }
      
          const placaJson = registros.map((placa) => JSON.parse(placa));
      
          const placaFiltrada = placaJson.filter(
            (placa) => placa.modelo === modelo || placa.marca === marca
          );
      
          if (!placaFiltrada) {
            return reply.status(401).send("Nem uma placa encontrada.");
          }
      
          return reply.send(placaFiltrada);
        });
      });
      
}