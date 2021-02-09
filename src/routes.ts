import { Router } from "express";
import StationsController from "./controller/StationsController";
import UsersController from "./controller/UsersController";
import TravelsController from "./controller/TravelsController";

const routes = Router();

// MVC
// MODELS - representa uma entidade do dado
// VIES - representa a visualização do nosso front-end
// CONTROLLERS - logica das nossas rotas

routes.post("/stations", StationsController.create);
routes.get("/stations/:id", StationsController.show);
routes.get("/stations", StationsController.index);
routes.put("/stations/removed-bike/:id", StationsController.removedBike);
routes.put("/stations/adding-bike/:id", StationsController.addingBike);

routes.post("/travels", TravelsController.create);
routes.get("/travels/:id_user", TravelsController.show);
routes.get("/travels", TravelsController.index);
routes.put(
  "/travels/finalizar-viagem/:id_user",
  TravelsController.updatedTravel
);

routes.post("/users", UsersController.create);
routes.post("/users/login", UsersController.authenthication);
routes.put("/users/meus-dados/:id", UsersController.updatedUser);
routes.get("/users/:id", UsersController.show);
routes.get("/users", UsersController.index);
routes.delete("/users/delete/:id", UsersController.delete);

routes.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

export default routes;
