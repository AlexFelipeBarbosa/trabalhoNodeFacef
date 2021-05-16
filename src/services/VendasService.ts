import { getCustomRepository, Repository } from "typeorm";
import { Cliente } from "../entities/Cliente";
import { Produto } from "../entities/Produto";
import { Venda } from "../entities/Venda";
import { VendaProduto } from "../entities/VendaProdutos";

import { ClientesRepository } from "../repositories/ClientesRepository";
import { ProdutosRepository } from "../repositories/ProdutosRepository";
import { VendasRepository } from "../repositories/VendasRepository";
import { VendaProdutosRepository } from "../repositories/VendaProdutosRepository";

interface IVendas {
  idVenda: number;
  idCliente: number;
  produtos: Array<Produto>;
  quantidade: number;
}

class VendasService {
  private vendasRepository: Repository<Venda>;
  private clientesRepository: Repository<Cliente>;
  private produtosRepository: Repository<Produto>;
  private vendaProdutosRepository: Repository<VendaProduto>;

  constructor() {
    this.vendasRepository = getCustomRepository(VendasRepository);
    this.clientesRepository = getCustomRepository(ClientesRepository);
    this.produtosRepository = getCustomRepository(ProdutosRepository);
    this.vendaProdutosRepository = getCustomRepository(VendaProdutosRepository);
  }

  async create({ idVenda, idCliente, produtos, quantidade }: IVendas) {
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
    let quantidadeTotal: number = 0;
    let produtoCadastro: Produto;
    let produtosUpdate = new Array<Produto>();
    let vendasProdutoSave = new Array<VendaProduto>();

    produtos.map((produto: Produto) => {
      let vendaProduto = new VendaProduto();

      index = produtosCadastro
        .map((e) => {
          return e.idProduto;
        })
        .indexOf(produto.idProduto);

      produtoCadastro = produtosCadastro[index];

      if (!produtosCadastro) {
        throw new Error(
          "Produto " + produto.descricao + "não existe no cadastro! Verifique!"
        );
      }

      if (produtoCadastro.estoque < quantidade) {
        throw new Error(
          "Produto " + produto.descricao + "não possui estoque suficiente!"
        );
      }

      produtoCadastro.estoque = produtoCadastro.estoque - quantidade;

      produtosUpdate.push(produtoCadastro);

      vendaProduto.idVendaProduto = Number(
        String(idVenda) + String(produto.idProduto)
      );
      vendaProduto.idVenda = Number(idVenda);
      vendaProduto.idProduto = produtoCadastro.idProduto;
      vendaProduto.quantidade = produtoCadastro.estoque;
      vendaProduto.valor = produtoCadastro.valor;

      vendasProdutoSave.push(vendaProduto);

      quantidadeTotal += quantidade;
      valorTotal += produtoCadastro.valor * quantidade;

      valorTotal = Math.floor(valorTotal * Math.pow(10, 2)) / Math.pow(10, 2);
    });

    const venda = this.vendasRepository.create({
      idVenda,
      idCliente,
      valorTotal,
    });

    await this.vendasRepository.save(venda);

    produtosUpdate.map(async (produto: Produto) => {
      await this.produtosRepository.save(produto);
    });

    vendasProdutoSave.map(async (vendaProduto: VendaProduto) => {
      await this.vendaProdutosRepository.save(vendaProduto);
    });
    return venda;
  }

  async findAll() {
    const listaVendas = await this.vendasRepository.find();

    return listaVendas;
  }
}

export { VendasService };
