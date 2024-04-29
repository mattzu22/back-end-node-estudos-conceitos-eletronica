import { readFile } from "fs";

export async function listParts(app){
    app.get("/list-parts", (request, reply) => {
        readFile("db-placas.txt", "utf-8", (err, data) => {
          const registros = data.split("\n");
      
          if (registros[registros.length - 1] === "") {
            registros.pop();
          }
      
          const registroJson = registros.map((registro) => JSON.parse(registro));
      
          console.log(registroJson);
      
          return reply.status(200).send(registroJson);
        });
      });
}