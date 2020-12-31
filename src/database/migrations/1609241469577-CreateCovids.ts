import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateCovids1609241469577 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "covids",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                        generationStrategy: "uuid",
                    },
                    {
                        name: "obitos",
                        type: "number",
                    },
                    {
                        name: "positivados",
                        type: "number",
                    },
                    {
                        name: "tratamento",
                        type: "number",
                    },
                    {
                        name: "suspeitos",
                        type: "number",
                    },
                    {
                        name: "recuperados",
                        type: "number",
                    },
                    {
                        name: "descartadps",
                        type: "number",
                    },
                    {
                        name: "date",
                        type: "timestamp",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("covids");
    }
}
