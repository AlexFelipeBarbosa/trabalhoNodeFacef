import { Router } from "express";
import { ClientesController } from "./controllers/ClientesController";

const routes = Router();

const clientesController = new ClientesController();

routes.post("/clientes", clientesController.create);
routes.put("/clientes/:idCliente", clientesController.update);
routes.get("/clientes", clientesController.findAll);
routes.get("/clientes/email", clientesController.findByEmail);
routes.get("/clientes/:idCliente", clientesController.findByID);

export { routes };
