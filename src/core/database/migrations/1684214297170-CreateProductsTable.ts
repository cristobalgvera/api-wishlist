import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductsTable1684214297170 implements MigrationInterface {
  name = 'CreateProductsTable1684214297170';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "checked" boolean NOT NULL DEFAULT false, "imageUrl" character varying NOT NULL, "checkedBy" text, "checkedAt" TIMESTAMP, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
