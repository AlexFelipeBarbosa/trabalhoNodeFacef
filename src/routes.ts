import { Router } from "express";
import { ClientesController } from "./controllers/ClientesController";

const routes = Router();

const clientesController = new ClientesController();

routes.post("/clientes", clientesController.create);
routes.get("/clientes", clientesController.findAll);
routes.get("/clientes/:email", clientesController.findByEmail);

export { routes };
