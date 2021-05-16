import { getCustomRepository, Repository } from "typeorm";
import { VendaProduto } from "../entities/VendaProdutos";
import { VendaProdutosRepository } from "../repositories/VendaProdutosRepository";

class VendaProdutosService {
  private vendaProdutosRepository: Repository<VendaProduto>;

  constructor() {
    this.vendaProdutosRepository = getCustomRepository(VendaProdutosRepository);
  }

  async listProdutosVenda(idVenda: number) {
    const listProdutos = this.vendaProdutosRepository.find({
      where: { idVenda },
      //relations: ["produto"],
    });

    return listProdutos;
  }
}

export { VendaProdutosService };
