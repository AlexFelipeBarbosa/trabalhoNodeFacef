import { getCustomRepository, Repository } from "typeorm";
import { Cliente } from "../entities/Cliente";
import { ClientesRepository } from "../repositories/ClientesRepositoty";

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
}

export { ClientesService };
