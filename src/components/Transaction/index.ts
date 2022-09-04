import { Router } from 'express'
import {
    FundTransferController,
    PaystackFundingInitiatorController,
    VerifyPaystackTransaction,
   
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

router.get(
    '/paystack/verify/:referenceId',
    GetSenderMiddleware,
    VerifyPaystackTransaction
)

export default router
