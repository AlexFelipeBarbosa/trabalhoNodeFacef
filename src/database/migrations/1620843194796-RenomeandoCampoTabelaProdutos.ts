import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class RenomeandoCampoTabelaProdutos1620843194796
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("produtos", "qtd_estoque", "estoque");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("produtos", "estoque", "qtd_estoque");
  }
}
