import { Router } from "express";
import StationsController from "./controller/StationsController";

const routes = Router();

// MVC
// MODELS - representa uma entidade do dado
// VIES - representa a visualização do nosso front-end
// CONTROLLERS - logica das nossas rotas

routes.post("/stations", StationsController.create);
routes.get("/stations/:id", StationsController.show);
routes.get("/stations", StationsController.index);
routes.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

export default routes;
