import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createStations1603716095972 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // REALIZAR AS ALTERACOES DO BANCO DE DADOS
    // ALTERAR, CRIAR, EXCLUIR
    await queryRunner.createTable(
      new Table({
        name: "stations",
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
            name: "latitude",
            type: "decimal",
            // numeros depois da virgula
            scale: 10,
            // numeros antes da virgula
            precision: 2,
          },
          {
            name: "longitude",
            type: "decimal",
            scale: 10,
            precision: 2,
          },
          {
            name: "bikeAvailable",
            type: "integer",
            unsigned: true,
          },
          {
            name: "bikeUnavailable",
            type: "integer",
            unsigned: true,
          },
          {
            name: "code",
            type: "integer",
            precision: 6,
            unsigned: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // DESFAZER O QUE FAZEMOS NO METODO UP
    await queryRunner.dropTable("stations");
  }
}
