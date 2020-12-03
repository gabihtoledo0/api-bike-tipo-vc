import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUser1606865938352 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "integer",
            // não pode ser numero negativo
            unsigned: true,
            // chave primaria
            isPrimary: true,
            // gerada automaticamente
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "phone",
            type: "integer",
            unsigned: true,
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "senha",
            type: "varchar",
          },
          {
            name: "numberCard",
            type: "integer",
            precision: 16,
            unsigned: true,
          },
          {
            name: "nameCard",
            type: "varchar",
          },
          {
            name: "dateCard",
            type: "varchar",
            precision: 5,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
