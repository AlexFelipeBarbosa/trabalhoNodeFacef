import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriandoProdutos1620841622950 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "produtos",
        columns: [
          {
            name: "idProduto",
            type: "number",
            isPrimary: true,
          },
          {
            name: "descricao",
            type: "varchar",
            isNullable: true,
          },

          {
            name: "valor",
            type: "decimal",
            precision: 10,
            scale: 2,
            default: 0,
          },

          {
            name: "qtd_estoque",
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
    await queryRunner.dropTable("produtos");
  }
}
