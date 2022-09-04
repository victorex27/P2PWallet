import { Router } from 'express'
import { FundTransferController } from './TransactionController'
import {
    GetSenderMiddleware,
    doesUserHaveSufficientBalance,
    isUserEmailTheSameWithRecipient,
} from './TransactionMiddleware'

const router = Router()

router.post(
    '/transfer/fund',
    GetSenderMiddleware,
    doesUserHaveSufficientBalance,
    isUserEmailTheSameWithRecipient,
    FundTransferController
)

export default router
