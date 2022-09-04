import { Response, NextFunction } from 'express'
import { NotFoundError } from '../../utilities/errors'
import UserRequest from '../../utilities/interface/UserRequest'
import { FundTransferService } from './TransactionService'

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
            .send({ message: 'fund transfer was successfully created.' })
    } catch (error) {
        next(error)
    }
}
