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

  async update({ idProduto, descricao, valor, estoque }: IProdutos) {
    const produto = await this.produtosRepository.findOne({
      idProduto,
    });

    if (!produto) {
      throw new Error("Código de Produto não encontrado!");
    }

    produto.descricao = descricao;
    produto.estoque = estoque;
    produto.valor = valor;

    await this.produtosRepository.save(produto);

    const produtoAtualizado = await this.produtosRepository.findOne({
      idProduto,
    });

    return produtoAtualizado;
  }

  async findAll() {
    const produtos = await this.produtosRepository.find();

    return produtos;
  }

  async findByID(idProduto: number) {
    const produto = await this.produtosRepository.findOne({
      idProduto,
    });

    if (!produto) {
      throw new Error("Produto não identificado!!!");
    }

    return produto;
  }
}

export { ProdutosService };
