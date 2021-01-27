import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTravel1611684087716 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "travels",
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
            name: "id_user",
            type: "integer",
          },
          {
            name: "id_initial_station",
            type: "integer",
          },
          {
            name: "id_finished_station",
            type: "integer",
            isNullable: true,
          },
          {
            name: "name_station",
            type: "varchar",
          },
          {
            name: "initial_date",
            type: "varchar",
          },
          {
            name: "initial_time",
            type: "varchar",
          },
          {
            name: "finish_date",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "finish_time",
            type: "varchar",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: "idUser",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["id_user"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("travels");
  }
}
