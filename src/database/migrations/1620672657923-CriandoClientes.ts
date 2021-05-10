import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriandoClientes1620672657923 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "clientes",
        columns: [
          {
            name: "idCliente",
            type: "number",
            isPrimary: true,
          },
          {
            name: "nome",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "email",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "endereco",
            type: "varchar",
          },
          {
            name: "telefone",
            type: "number",
          },
          {
            name: "dataCadastro",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("clientes");
  }
}
