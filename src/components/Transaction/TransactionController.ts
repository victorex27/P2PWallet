import crypto from 'crypto';
import { Response, NextFunction } from 'express'
import config from 'config';
import { NotFoundError } from '../../utilities/errors'
import UserRequest from '../../utilities/interface/UserRequest'
import {
    FundTransferService,
    PaystackFundingInitiatorService,
    VerifyPaystackTransactionService,
} from './TransactionService'

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

        return res.status(201).send({ message: 'Transfer was successful.' })
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

        return res
            .status(201)
            .send({ ...response.data, message: response.message })
    } catch (error) {
        next(error)
    }
}

export const VerifyPaystackTransaction = async (
    req: UserRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        
        const referenceId = req.params.referenceId as string

        const sender = req?.sender

        if (!sender) {
            throw NotFoundError('User not found')
        }

        const response = await VerifyPaystackTransactionService(referenceId, sender);

        return res
            .status(200)
            .send({ status: response.data.status , message: response.message })
            
    } catch (error) {
        next(error)
    }
}