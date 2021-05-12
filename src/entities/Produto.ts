import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("produtos")
class Produto {
  @PrimaryColumn()
  idProduto: number;

  @Column()
  descricao: string;

  @Column()
  valor: number;

  @Column()
  estoque: number;

  @CreateDateColumn()
  dataCadastro: Date;
}

export { Produto };
