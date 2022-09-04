import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAndTransactionRecord1662290547120 implements MigrationInterface {
    name = 'UserAndTransactionRecord1662290547120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "balance" double precision DEFAULT '0', CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "paystack_transaction" ("id" SERIAL NOT NULL, "authorizationUrl" character varying, "paystackId" character varying, "accessCode" character varying, "referenceId" character varying, "amount" double precision NOT NULL, "status" text NOT NULL, "channel" text NOT NULL, "currency" character varying DEFAULT 'NGN', "fees" double precision DEFAULT '0', "userId" integer, CONSTRAINT "PK_0b6671910f7336ae3f31c77e633" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fund_transfer" ("id" SERIAL NOT NULL, "amount" double precision NOT NULL, "status" text NOT NULL, "channel" text NOT NULL DEFAULT 'wallet', "currency" character varying DEFAULT 'NGN', "fees" double precision DEFAULT '0', "userId" integer, "recipientId" integer, CONSTRAINT "PK_4665e1a51b2ef8238c283f27d9c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "paystack_transaction" ADD CONSTRAINT "FK_4d1b83650a516569e90e883a32f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fund_transfer" ADD CONSTRAINT "FK_2c57ad1439a931fb3d904f2c7d9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fund_transfer" ADD CONSTRAINT "FK_ab0cb9092b357fed65041d83800" FOREIGN KEY ("recipientId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fund_transfer" DROP CONSTRAINT "FK_ab0cb9092b357fed65041d83800"`);
        await queryRunner.query(`ALTER TABLE "fund_transfer" DROP CONSTRAINT "FK_2c57ad1439a931fb3d904f2c7d9"`);
        await queryRunner.query(`ALTER TABLE "paystack_transaction" DROP CONSTRAINT "FK_4d1b83650a516569e90e883a32f"`);
        await queryRunner.query(`DROP TABLE "fund_transfer"`);
        await queryRunner.query(`DROP TABLE "paystack_transaction"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
