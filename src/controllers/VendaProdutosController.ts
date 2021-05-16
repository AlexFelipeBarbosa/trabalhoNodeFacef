import { Request, Response } from "express";
import { VendaProdutosService } from "../services/VendaProdutosService";

class VendaProdutosController {
  async findProdutosVenda(request: Request, response: Response) {
    const { idVenda } = request.params;

    const vendaProdutosService = new VendaProdutosService();

    const listaProdutos = await vendaProdutosService.listProdutosVenda(
      Number(idVenda)
    );

    return response.json(listaProdutos);
  }
}

export { VendaProdutosController };
