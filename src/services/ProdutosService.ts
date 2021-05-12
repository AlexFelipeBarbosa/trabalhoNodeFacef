import { getCustomRepository, Repository } from "typeorm";
import { Produto } from "../entities/Produto";
import { ProdutosRepository } from "../repositories/ProdutosRepository";

interface IProdutos {
  idProduto: number;
  descricao: string;
  valor: number;
  estoque: number;
}

class ProdutosService {
  private produtosRepository: Repository<Produto>;

  constructor() {
    this.produtosRepository = getCustomRepository(ProdutosRepository);
  }

  async create({ idProduto, descricao, valor, estoque }: IProdutos) {
    let produtoExiste = await this.produtosRepository
      .createQueryBuilder()
      .where("LOWER(descricao) = LOWER(:descricao)", { descricao })
      .getOne();

    if (produtoExiste) {
      throw new Error("Este produto já possui cadastro!");
    }

    produtoExiste = await this.produtosRepository.findOne({
      idProduto,
    });

    if (produtoExiste) {
      throw new Error("Código já cadastrado!");
    }

    const produto = this.produtosRepository.create({
      idProduto,
      descricao,
      valor,
      estoque,
    });

    await this.produtosRepository.save(produto);

    return produto;
  }
}

export { ProdutosService };
