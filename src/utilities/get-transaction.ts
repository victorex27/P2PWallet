import { AppDataSource } from '../data-source'

import { PaystackTransaction } from '../entity/PaystackTransaction'

export async function getPaystackTransactionFromDatabase(referenceId: string) {
    const paystackTransactionRepository = AppDataSource.getRepository(PaystackTransaction)

    console.log({referenceId});
    const transaction = await paystackTransactionRepository.findOne({
        select: ['id','user','amount','status'],
        where: {
            referenceId,
        },
    })

    console.log({transaction})

    return transaction
}
