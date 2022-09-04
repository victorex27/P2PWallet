import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserAndTransactionRecord1662301436259
    implements MigrationInterface
{
    name = 'UserAndTransactionRecord1662301436259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "paystack_transaction" ALTER COLUMN "channel" DROP NOT NULL`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "paystack_transaction" ALTER COLUMN "channel" SET NOT NULL`
        )
    }
}
