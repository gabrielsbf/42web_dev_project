import Fastify from "fastify";

import { Database } from "./local-database.js";

const server = Fastify();
const database = new Database();

server.post("/summarization", (request, response) => {
  const { title, link, startAt, endAt } = request.body;

  database.create({
    title: title,
    link: link,
    startAt: startAt,
    endAt: endAt,
  })

  return response.status(201).send();
});

server.get("/summarizations", (request, response) => {
  const search = request.query.search;
  const summarizations = database.list(search);

  return response.status(200).send(summarizations);
});

// server.get("/summarization/:metric/:find", (request, response) =>
// {
//   const metric = request.query.metric
//   const find = request.query.find

// }

server.put("/summarization/:id", (request, response) => {
  const summarizationId = request.params.id;
  const {title, link, startAt, endAt} = request.body

  database.update(summarizationId, {
    title: title,
    link : link,
    startAt : startAt,
    endAt : endAt
  })

  return response.status(204).send;
});

server.delete("/summarization/:id", (request, response) => {
    const summarizationId = request.params.id;
	database.delete(summarizationId)

	return response.status(204).send
});

server.listen({
    port: 3333
});
console.log("Server listening on port: 3333");
