import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriandoVendaProdutos1620937488248 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "vendaProdutos",
        columns: [
          {
            name: "idVendaProduto",
            type: "number",
            isPrimary: true,
          },

          {
            name: "idVenda",
            type: "number",
            isNullable: true,
          },

          {
            name: "idProduto",
            type: "number",
            isNullable: true,
          },

          {
            name: "valor",
            type: "decimal",
            isNullable: true,
            precision: 10,
            scale: 2,
            default: 0,
          },

          {
            name: "quantidade",
            type: "decimal",
            isNullable: true,
            precision: 10,
            scale: 2,
            default: 0,
          },
        ],

        foreignKeys: [
          {
            name: "FKVenda",
            referencedTableName: "vendas",
            referencedColumnNames: ["idVenda"],
            columnNames: ["idVenda"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },

          {
            name: "FKProduto",
            referencedTableName: "produtos",
            referencedColumnNames: ["idProduto"],
            columnNames: ["idProduto"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("vendaProdutos");
  }
}
