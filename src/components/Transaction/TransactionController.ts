import { Response, NextFunction } from 'express'
import { NotFoundError } from '../../utilities/errors'
import UserRequest from '../../utilities/interface/UserRequest'
import { FundTransferService, PaystackFundingInitiatorService } from './TransactionService'

import { FundTransferPayload } from './TransactionValidator'

export const FundTransferController = async (
    req: UserRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const payload = req.body as FundTransferPayload
        const sender = req?.sender

        if (!sender) {
            throw NotFoundError('User not found')
        }

        await FundTransferService(payload, sender)

        return res
            .status(201)
            .send({ message: 'Transfer was successful.' })
    } catch (error) {
        next(error)
    }
}


export const PaystackFundingInitiatorController = async (
    req: UserRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const payload = req.body as FundTransferPayload
        const sender = req?.sender

        if (!sender) {
            throw NotFoundError('User not found')
        }

        const response = await PaystackFundingInitiatorService(sender, payload)

        console.log({ response });

        return res
            .status(201)
            .send({ ...response.data , message: response.message})
    } catch (error) {
        next(error)
    }
}

