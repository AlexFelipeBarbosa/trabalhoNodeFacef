import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Produto } from "./Produto";

@Entity("vendaProdutos")
class VendaProduto {
  @PrimaryColumn()
  idVendaProduto: number;

  @Column()
  idVenda: number;

  @JoinColumn({ name: "idProduto" })
  @ManyToOne(() => Produto)
  idProduto: Produto;

  @Column()
  valor: number;

  @Column()
  quantidade: number;
}

export { VendaProduto };
