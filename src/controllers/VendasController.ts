import { Request, Response } from "express";
import { ProdutosService } from "../services/ProdutosService";
import { VendasService } from "../services/VendasService";

class VendasController {
  async create(request: Request, response: Response) {
    const { idVenda, idCliente, produtos, quantidade } = request.body;
    const vendasService = new VendasService();

    try {
      const venda = await vendasService.create({
        idVenda,
        idCliente,
        produtos,
        quantidade,
      });

      if (venda) {
        return response.status(201).json(venda);
      } else {
        return response.status(404).json({
          message: "Erro ao efetuar a Venda!",
        });
      }
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }

  async findAll(request: Request, response: Response) {
    const vendasService = new VendasService();

    const listaVendas = await vendasService.findAll();

    return response.json(listaVendas);
  }
}

export { VendasController };
