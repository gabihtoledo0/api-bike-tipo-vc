import express from "express";
import "express-async-errors";
import "./database/connection";
import routes from "./routes";
import errorHandler from "./errors/handler";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errorHandler);
// ROTA = conjunto

// RECURSO - usuario

// METODOS HTTP = GET, POST, PUT, DELETE
// PARAMETROS:

// GET = buscar uma informação (lista, item)
// POST = criando uma informação
// PUT = editando uma informação
// DELETE = deletando uma informação

// Query params: http://localhost:3333/users?search=diego
// Route params: http://localhost:3333/users/1 (identificar um recurso)
// body: ttp://localhost:3333/users (identificar um recurso)

app.listen(3333);
