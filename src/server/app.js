import { randomUUID } from "crypto";
import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { readFile } from "fs";
import { appendFile } from "fs";

const app = fastify();

app.register(fastifyCors);

app.post("/salvar-placa", (request, reply) => {
  const { modelo, marca } = request.query;

  if (!modelo || !marca === "") {
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

app.get("/listar-placas", (request, reply) => {
  readFile("db-placas.txt", "utf-8", (err, data) => {
    const registros = data.split("\n");

    if (registros[registros.length - 1] === "") {
      registros.pop();
    }

    const registroJson = registros.map((registro) => JSON.parse(registro));

    return reply.status(200).send(registroJson)
  });
});

app.get('/buscar-placas', (request, reply) =>{
    const { modelo, marca } = request.query;

    readFile("db-placas.txt", "utf-8", (err, data)=>{
      const registros = data.split("\n");

    if (registros[registros.length - 1] === "") {
      registros.pop();
    }

      const placaJson = registros.map(placa => JSON.parse(placa));

      const placaFiltrada = placaJson.filter(placa => placa.modelo === modelo || placa.marca === marca);

      if (!placaFiltrada) {
          return reply.status(401).send("Nem uma placa encontrada.")
      }
    
      return reply.send(placaFiltrada)
    })
})

app.delete("/deletar-placa/:id", (request, reply) =>{
  readFile("db-placas.txt", "utf-8", (err, data) =>{
    const { id } = request.params;

    const registros  = data.split("\n");
    
    if (registros[registros.length - 1] === "") {
        registros.pop();
    }

    const registrosJson = registros.map(reg => JSON.parse(reg));

    const novoArrayComregsitroDeletado = registrosJson.filter(reg => reg.id !== id);

    return reply.send(novoArrayComregsitroDeletado)
  })
})

app.listen({ port: 3334, host: "0.0.0.0" }).then(() => {
  console.log("Server is Runnig");
});
