import { validate } from 'class-validator'
import { getUserFromDatabase } from '../../utilities/get-user'
import { UserError, NotFoundError } from '../../utilities/errors'
import { FundTransferPayload } from './TransactionValidator'
import { performFundTransfer } from '../../utilities/update-user-balance'
import { User } from '../../entity/User'
import { initiatePaystackFundingRequest } from '../../utilities/axiosCall'
import { insertRequestIntoPaystackTransactionsDatabase } from '../../utilities/add-to-paystack-table'

const runValidation = async (payload: FundTransferPayload) => {
    const validator = new FundTransferPayload()

    validator.amount = payload?.amount
    validator.email = payload?.email

    const errors = await validate(validator)

    if (errors.length > 0) {
        throw UserError(`Invalid ${errors[0].property}`)
    }
}

export const FundTransferService = async (
    payload: FundTransferPayload,
    sender: User
) => {
    await runValidation(payload)

    const recipient = await getUserFromDatabase(payload.email)

    if (!recipient) throw NotFoundError('Recipient account not found')

    await performFundTransfer({ sender, recipient, amount: payload.amount })
}

export const PaystackFundingInitiatorService = async (
    user: User,
    payload: FundTransferPayload
) => {
    payload.email = user.email
    await runValidation(payload)

    const response = await initiatePaystackFundingRequest(payload)

    insertRequestIntoPaystackTransactionsDatabase(
        user,
        response,
        payload.amount
    )

    return response
}
