import { getCustomRepository, Repository } from "typeorm";
import { Cliente } from "../entities/Cliente";
import { ClientesRepository } from "../repositories/ClientesRepository";

interface IClientes {
  idCliente: number;
  nome: string;
  email: string;
  endereco: string;
  telefone: number;
}

class ClientesService {
  private clientesRepository: Repository<Cliente>;

  constructor() {
    this.clientesRepository = getCustomRepository(ClientesRepository);
  }

  async findAll() {
    const clientes = await this.clientesRepository.find();

    return clientes;
  }

  async create({ idCliente, nome, email, endereco, telefone }: IClientes) {
    let clienteExiste = await this.clientesRepository.findOne({ email });

    if (clienteExiste) {
      throw new Error("Email já cadastrado! Verifique!");
    }

    const cliente = this.clientesRepository.create({
      idCliente,
      nome,
      email,
      endereco,
      telefone,
    });

    await this.clientesRepository.save(cliente);

    return cliente;
  }

  async findByEmail(email: string) {
    const cliente = await this.clientesRepository.findOne({
      email,
    });

    if (!cliente) {
      throw new Error("Cliente não identificado!");
    }
    return cliente;
  }

  async findByID(idCliente: number) {
    const cliente = await this.clientesRepository.findOne({
      idCliente,
    });

    if (!cliente) {
      throw new Error("Cliente não identificado!");
    }
    return cliente;
  }

  async update({ idCliente, nome, email, endereco, telefone }: IClientes) {
    const cliente = await this.clientesRepository.findOne({
      idCliente,
    });

    if (!cliente) {
      throw new Error("Cliente não idenficado!!!");
    }

    cliente.nome = nome;
    cliente.email = email;
    cliente.endereco = endereco;
    cliente.telefone = telefone;

    await this.clientesRepository.save(cliente);

    const clienteAtualizado = await this.clientesRepository.findOne({
      idCliente,
    });
    return clienteAtualizado;
  }
}

export { ClientesService };
