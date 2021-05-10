import { Request, Response } from "express";
import { ClientesService } from "../services/ClientesService";

class ClientesController {
  async findAll(request: Request, response: Response) {
    const clientesService = new ClientesService();
    const clientes = await clientesService.findAll();

    return response.json(clientes);
  }

  async create(request: Request, response: Response) {
    const { idCliente, nome, email, endereco, telefone } = request.body;
    const clientesService = new ClientesService();

    try {
      const cliente = await clientesService.create({
        idCliente,
        nome,
        email,
        endereco,
        telefone,
      });
      if (cliente) {
        return response.status(201).json(cliente);
      } else {
        return response
          .status(400)
          .json({ message: "Erro ao cadastrar um novo cliente!" });
      }
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }

  async findByEmail(request: Request, response: Response) {
    const { email } = request.params;

    const clientesService = new ClientesService();

    try {
      const cliente = await clientesService.findByEmail(email);

      return response.json(cliente);
    } catch (error) {
      return response.status(404).json({
        message: error.message,
      });
    }
  }
}

export { ClientesController };
