import { validate } from 'class-validator'
import { getUserFromDatabase } from '../../utilities/get-user'
import { UserError, NotFoundError } from '../../utilities/errors'
import { FundTransferPayload } from './TransactionValidator'
import { performFundTransfer } from '../../utilities/update-user-balance'
import { User } from '../../entity/User'

export const FundTransferService = async (
    payload: FundTransferPayload,
    sender: User
) => {
    const validator = new FundTransferPayload()

    validator.amount = payload?.amount
    validator.email = payload?.email

    const errors = await validate(validator)

    if (errors.length > 0) {
        throw UserError(`Invalid ${errors[0].property}`)
    }

    const recipient = await getUserFromDatabase(validator.email)

    if (!recipient) throw NotFoundError('Recipient account not found')

    await performFundTransfer({ sender, recipient, amount: payload.amount })
}
