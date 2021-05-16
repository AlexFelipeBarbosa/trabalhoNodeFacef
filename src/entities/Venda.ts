import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Cliente } from "./Cliente";

@Entity("vendas")
class Venda {
  @PrimaryColumn()
  idVenda: number;

  @JoinColumn({ name: "idCliente" })
  @ManyToOne(() => Cliente)
  idCliente: number;

  @Column()
  valorTotal: number;

  @CreateDateColumn()
  dataVenda: Date;
}

export { Venda };
