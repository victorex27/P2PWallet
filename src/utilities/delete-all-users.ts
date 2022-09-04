import { AppDataSource } from '../data-source'
import { FundTransfer } from '../entity/FundTransfer'
import { PaystackTransaction } from '../entity/PaystackTransaction'
import { User } from '../entity/User'
import STATUS from './status'

export const deleteAllUsersFromDatabase = (done: () => void) => {
    const userRepository = AppDataSource.getRepository(User)

    userRepository
        .delete({ firstName: 'amaobi' })
        .then(() => {
            AppDataSource.destroy().then(() => {
                done()
            })
        })
        .catch((error) => console.log(error))
}

export const deleteAllFundTransferFromDatabase = () => {
    const fundTransfeRepository = AppDataSource.getRepository(FundTransfer)

    return fundTransfeRepository.delete({ status: STATUS.SUCCESSFUL })
}


export const deleteAllPaystackDataFromDatabase = () => {
    const fundTransfeRepository = AppDataSource.getRepository(PaystackTransaction)

    return fundTransfeRepository.delete({ currency:'NGN'  })
}
