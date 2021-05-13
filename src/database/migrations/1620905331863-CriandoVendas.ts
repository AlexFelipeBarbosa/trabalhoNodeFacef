import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriandoVendas1620905331863 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "vendas",
        columns: [
          {
            name: "idVenda",
            type: "number",
            isPrimary: true,
          },

          {
            name: "idCliente",
            type: "number",
            isNullable: true,
          },

          {
            name: "valorTotal",
            type: "decimal",
            isNullable: true,
            precision: 10,
            scale: 2,
            default: 0,
          },

          {
            name: "formaPagamento",
            type: "varchar",
          },

          {
            name: "dataVenda",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKCliente",
            referencedTableName: "clientes",
            referencedColumnNames: ["idCliente"],
            columnNames: ["idCliente"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("vendas");
  }
}
