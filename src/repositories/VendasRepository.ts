import { EntityRepository, Repository } from "typeorm";
import { Venda } from "../entities/Venda";

@EntityRepository(Venda)
class VendasRepository extends Repository<Venda> {}

export { VendasRepository };
