import { validate } from 'class-validator'
import {
    getUserByIdFromDatabase,
    getUserFromDatabase,
} from '../../utilities/get-user'
import {
    UserError,
    NotFoundError,
    CustomError,
    ForbiddenError,
} from '../../utilities/errors'
import { FundTransferPayload } from './TransactionValidator'
import { performFundTransfer } from '../../utilities/update-user-balance'
import { User } from '../../entity/User'
import {
    initiatePaystackFundingRequest,
    verifyPaystackTransactionRequest,
} from '../../utilities/axiosCall'
import {
    insertRequestIntoPaystackTransactionsDatabase,
    updatePaystackTransactionsDatabase,
} from '../../utilities/add-to-paystack-table'
import { getPaystackTransactionFromDatabase } from '../../utilities/get-transaction'
import STATUS from '../../utilities/status'

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

export const VerifyPaystackTransactionService = async (
    referenceId: string,
    user: User
) => {
    if (!referenceId) throw UserError('Reference id not found')

    const transaction = await getPaystackTransactionFromDatabase(referenceId)

    if (!transaction) throw NotFoundError('No transaction found with reference')

    const response = await verifyPaystackTransactionRequest(referenceId)

    if (
        response.data.status === STATUS.SUCCESSFUL &&
        transaction.status === STATUS.PENDING
    ) {
        updatePaystackTransactionsDatabase(referenceId, response, user)
    }

    return response
}
