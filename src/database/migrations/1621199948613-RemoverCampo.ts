import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class RemoverCampo1621199948613 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("vendas", "formaPagamento");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "vendas",
      new TableColumn({
        name: "formaPagamento",
        type: "varchar",
      })
    );
  }
}
