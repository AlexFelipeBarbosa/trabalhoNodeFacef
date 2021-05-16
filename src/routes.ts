import { Router } from "express";
import { ClientesController } from "./controllers/ClientesController";
import { ProdutosController } from "./controllers/ProdutosController";
import { VendasController } from "./controllers/VendasController";
import { VendaProdutosController } from "./controllers/VendaProdutosController";

const routes = Router();

const clientesController = new ClientesController();
const produtosController = new ProdutosController();
const vendasController = new VendasController();
const vendaProdutosController = new VendaProdutosController();

// Rotas de Clientes
routes.post("/clientes", clientesController.create);
routes.put("/clientes/:idCliente", clientesController.update);
routes.get("/clientes", clientesController.findAll);
routes.get("/clientes/email", clientesController.findByEmail);
routes.get("/clientes/:idCliente", clientesController.findByID);

// Rotas de Produtos
routes.post("/produtos", produtosController.create);
routes.put("/produtos/:idProduto", produtosController.update);
routes.get("/produtos", produtosController.findAll);
routes.get("/produtos/:idProduto", produtosController.findByID);

// Rotas de Vendas
routes.post("/vendas", vendasController.create);
routes.get("/vendas", vendasController.findAll);
routes.get(
  "/vendas/produtos/:idVenda",
  vendaProdutosController.findProdutosVenda
);

export { routes };
