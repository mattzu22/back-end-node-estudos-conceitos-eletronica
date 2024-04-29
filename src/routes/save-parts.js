import { appendFile } from "fs";
import { randomUUID } from "crypto";
import { readFile } from "fs";

export async function saveParts(app){
    app.post("/save-parts", (request, reply) => {
        const { modelo, marca, peca } = request.query;
      
        if (!modelo || !marca || !peca === "") {
          return reply.send("Preencha os campos.");
        }
      
        readFile("db-placas.txt", "utf-8", (err, data) => {
          const linhas = data.trim().split("\n");
      
          const modeloExistente = linhas.some((linha) => {
            const registro = JSON.parse(linha);
            return registro.modelo === modelo;
          });
      
          if (modeloExistente) {
            return reply.status(400).send("Modelo já cadastrado!");
          }
      
          const id = randomUUID();
      
          const novoRegistro = {
            id,
            modelo,
            marca,
            peca,
          };
      
          const novoRegistroJson = JSON.stringify(novoRegistro) + "\n";
      
          appendFile(
            "db-placas.txt",
            novoRegistroJson,
            {
              encoding: "utf-8",
            },
            (err) => {
              return reply.status(500).send(`Erro ${err} ao salvar o arquivo`);
            }
          );
          reply.status(201).send("Salvo com sucesso!");
        });
      });
}
