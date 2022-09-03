import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserAndTransactionRecord1662226287648
    implements MigrationInterface
{
    name = 'UserAndTransactionRecord1662226287648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "balance" double precision DEFAULT '0', CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "authorizationUrl" character varying NOT NULL, "paystackId" character varying NOT NULL, "accessCode" character varying NOT NULL, "referenceId" character varying NOT NULL, "amount" double precision NOT NULL, "status" text NOT NULL, "channel" text NOT NULL, "currency" double precision NOT NULL, "fees" double precision NOT NULL, "userId" integer, "recipientId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `ALTER TABLE "transaction" ADD CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "transaction" ADD CONSTRAINT "FK_70bc33e4e93a3146119eb291a80" FOREIGN KEY ("recipientId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "transaction" DROP CONSTRAINT "FK_70bc33e4e93a3146119eb291a80"`
        )
        await queryRunner.query(
            `ALTER TABLE "transaction" DROP CONSTRAINT "FK_605baeb040ff0fae995404cea37"`
        )
        await queryRunner.query(`DROP TABLE "transaction"`)
        await queryRunner.query(`DROP TABLE "user"`)
    }
}
