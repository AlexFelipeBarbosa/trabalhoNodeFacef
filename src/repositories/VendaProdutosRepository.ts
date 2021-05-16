import { EntityRepository, Repository } from "typeorm";
import { VendaProduto } from "../entities/VendaProdutos";

@EntityRepository(VendaProduto)
class VendaProdutosRepository extends Repository<VendaProduto> {}

export { VendaProdutosRepository };
