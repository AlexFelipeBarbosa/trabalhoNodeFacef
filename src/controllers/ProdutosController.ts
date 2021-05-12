import { Request, Response } from "express";
import { ProdutosService } from "../services/ProdutosService";

class ProdutosController {
  async create(request: Request, response: Response) {
    const { idProduto, descricao, valor, estoque } = request.body;
    const produtosService = new ProdutosService();

    try {
      const produto = await produtosService.create({
        idProduto,
        descricao,
        valor,
        estoque,
      });

      if (produto) {
        return response.status(201).json(produto);
      } else {
        return response.status(404).json({
          message: "Erro ao cadastrar o Produto",
        });
      }
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }
}

export { ProdutosController };
