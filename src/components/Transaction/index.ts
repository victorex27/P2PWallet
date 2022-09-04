import { Router } from 'express'
import {
    FundTransferController,
    PaystackFundingInitiatorController,
} from './TransactionController'
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

router.post(
    '/paystack/initiate',
    GetSenderMiddleware,
    PaystackFundingInitiatorController
)

export default router
