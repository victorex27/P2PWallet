import { AppDataSource } from '../data-source'
import { PaystackTransaction } from '../entity/PaystackTransaction'

import { User } from '../entity/User'
import { initiatePaystackFundingResponseInterface } from './interface/paystack'
import STATUS from './status'


export const insertRequestIntoPaystackTransactionsDatabase = (user: User, response: initiatePaystackFundingResponseInterface, amount: number) => {
    const paystackTransactionRepository = AppDataSource.getRepository(PaystackTransaction)

    const paystackTransaction = new PaystackTransaction();

    paystackTransaction.user = user;
    paystackTransaction.status = STATUS.PENDING;
    paystackTransaction.authorizationUrl = response.data.authorization_url;
    paystackTransaction.accessCode = response.data.access_code;
    paystackTransaction.referenceId = response.data.reference;
    paystackTransaction.amount = amount;



    return paystackTransactionRepository
        .save(paystackTransaction)
       
}