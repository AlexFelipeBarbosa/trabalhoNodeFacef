import { EntityRepository, Repository } from "typeorm";
import { Produto } from "../entities/Produto";

@EntityRepository(Produto)
class ProdutosRepository extends Repository<Produto> {}

export { ProdutosRepository };
