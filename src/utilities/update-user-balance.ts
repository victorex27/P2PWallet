import { AppDataSource } from '../data-source'
import { FundTransfer } from '../entity/FundTransfer'
import { PaystackTransaction } from '../entity/PaystackTransaction'

import { User } from '../entity/User'
import STATUS from './status'

interface TransactionInterface {
    sender: User
    recipient: User
    amount: number
}

export const updateUserBalance = (email: string, amount: number) => {
    const userRepository = AppDataSource.getRepository(User)

    return userRepository
        .createQueryBuilder()
        .update({
            balance: amount,
        })
        .where({ email })
}

export const performFundTransfer = async ({
    sender,
    recipient,
    amount,
}: TransactionInterface) => {
    await AppDataSource.manager.transaction(
        async (transactionalEntityManager) => {
            const fundTransfer = new FundTransfer()

            fundTransfer.recipient = recipient
            fundTransfer.user = sender
            fundTransfer.amount = amount
            fundTransfer.status = STATUS.SUCCESSFUL

            await transactionalEntityManager.update(
                User,
                { email: sender.email },
                { balance: sender.balance - amount }
            )
            await transactionalEntityManager.update(
                User,
                { email: recipient.email },
                { balance: recipient.balance + amount }
            )
            await transactionalEntityManager.save(FundTransfer, fundTransfer)
        }
    )
}

