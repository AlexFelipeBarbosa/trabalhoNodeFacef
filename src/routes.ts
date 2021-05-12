import { Router } from "express";
import { ClientesController } from "./controllers/ClientesController";
import { ProdutosController } from "./controllers/ProdutosController";

const routes = Router();

const clientesController = new ClientesController();
const produtosController = new ProdutosController();

// Rotas de Clientes
routes.post("/clientes", clientesController.create);
routes.put("/clientes/:idCliente", clientesController.update);
routes.get("/clientes", clientesController.findAll);
routes.get("/clientes/email", clientesController.findByEmail);
routes.get("/clientes/:idCliente", clientesController.findByID);

// Rotas de Produtos
routes.post("/produtos", produtosController.create);
routes.put("/produtos/:idProduto", produtosController.update);

export { routes };
