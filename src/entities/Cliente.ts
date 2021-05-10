import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("clientes")
class Cliente {
  @PrimaryColumn()
  idCliente: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  endereco: string;

  @Column()
  telefone: number;

  @CreateDateColumn()
  dataCadastro: Date;
}

export { Cliente };
