import { getCustomRepository, Repository } from "typeorm";
import { Cliente } from "../entities/Cliente";
import { Produto } from "../entities/Produto";
import { Venda } from "../entities/Venda";
import { ClientesRepository } from "../repositories/ClientesRepository";
import { ProdutosRepository } from "../repositories/ProdutosRepository";
import { VendasRepository } from "../repositories/VendasRepository";

interface IVendas {
  idVenda: number;
  idCliente: number;
  produtos: Array<Produto>;
}

class VendasService {
  private vendasRepository: Repository<Venda>;
  private clientesRepository: Repository<Cliente>;
  private produtosRepository: Repository<Produto>;

  constructor() {
    this.vendasRepository = getCustomRepository(VendasRepository);
    this.clientesRepository = getCustomRepository(ClientesRepository);
    this.produtosRepository = getCustomRepository(ProdutosRepository);
  }

  /*
  async create({ idVenda, idCliente, produtos }: IVendas) {
    const vendaExiste = await this.vendasRepository.findOne({
      idVenda,
    });

    if (vendaExiste) {
      throw new Error("Essa Venda já existe! Verifique!");
    }

    const clienteExiste = await this.clientesRepository
      .createQueryBuilder()
      .where("idCliente = :idCliente", { idCliente })
      .getOne();

    if (!clienteExiste) {
      throw new Error(
        "Não foi identificado o cadastro do Cliente desta Venda!"
      );
    }

    if (!produtos) {
      throw new Error("Não foi informado o Produto para a Venda!");
    }

    const produtosCadastro = await this.produtosRepository.find();

    let index = -1;
    let valorTotal: number = 0.0;
    let produtoCadastro: Produto;
    let produtosUpdate = new Array<Produto>();
    let vendasProdutoSave = new Array<PedidoProduto>();
    produtos.map((produto: Produto) => {
      let pedidoProduto = new PedidoProduto();

      index = produtosCadastro
        .map((e) => {
          return e.idProduto;
        })
        .indexOf(produto.idProduto);

      produtoCadastro = produtosCadastro[index];
    });
  }
  */
}

export { VendasService };
