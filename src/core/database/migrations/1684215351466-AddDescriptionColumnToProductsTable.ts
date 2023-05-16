import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDescriptionColumnToProductsTable1684215351466
  implements MigrationInterface
{
  name = 'AddDescriptionColumnToProductsTable1684215351466';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD "description" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "description"`);
  }
}
