import { AppDataSource } from '../data-source'
import { PaystackTransaction } from '../entity/PaystackTransaction'

import { User } from '../entity/User'
import {
    initiatePaystackFundingResponseInterface,
    verifyPaystackFundingResponseInterface,
} from './interface/paystack'
import STATUS from './status'

export const insertRequestIntoPaystackTransactionsDatabase = (
    user: User,
    response: initiatePaystackFundingResponseInterface,
    amount: number
) => {
    const paystackTransactionRepository =
        AppDataSource.getRepository(PaystackTransaction)

    const paystackTransaction = new PaystackTransaction()

    paystackTransaction.user = user
    paystackTransaction.status = STATUS.PENDING
    paystackTransaction.authorizationUrl = response.data.authorization_url
    paystackTransaction.accessCode = response.data.access_code
    paystackTransaction.referenceId = response.data.reference
    paystackTransaction.amount = amount

    return paystackTransactionRepository.save(paystackTransaction)
}

export const updatePaystackTransactionsDatabase = async (
    referenceId: string,
    response: verifyPaystackFundingResponseInterface,
    user: User
) => {
    await AppDataSource.manager.transaction(
        async (transactionalEntityManager) => {
            await transactionalEntityManager.update(
                PaystackTransaction,
                { referenceId, user },
                {
                    status: response.data.status,
                    paystackId: response.data.id,
                    fees: response.data.fees,
                }
            )

            await transactionalEntityManager.update(
                User,
                { email: user.email },
                { balance: user.balance + response.data.amount / 100 }
            )
        }
    )
}
