import { FundTransferPayload } from '../components/Transaction/TransactionValidator'
import { AppDataSource } from '../data-source'

import { User } from '../entity/User'



export const updateUserBalance = (email: string, amount: number) => {

    // const user = new User();

    const userRepository = AppDataSource.getRepository(User)

    return userRepository.createQueryBuilder().update({
        balance: amount
    }).where({ email })
} 


export const performFundTransfer = async ({ email: senderEmail, amount: senderAmount} :FundTransferPayload, { email: recipient, amount}: FundTransferPayload)=>{

    await AppDataSource.manager.transaction( async (transactionalEntityManager)=>{

       const a = await transactionalEntityManager.update( User, {email: senderEmail}, { balance: senderAmount});
       const b = await transactionalEntityManager.update( User, {email: recipient},{ balance: amount});
        console.log({a,b, senderEmail, senderAmount});
    });

}