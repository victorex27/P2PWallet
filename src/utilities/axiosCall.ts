import axios from 'axios'
import config from 'config'
import { FundTransferPayload } from '../components/Transaction/TransactionValidator'
import { initiatePaystackFundingResponseInterface } from './interface/paystack'

const paystackInitiateUrl: string = config.get('App.paystack.url.inititate')
const paystackSecret: string = config.get('App.paystack.secretKey')
const webhook: string = config.get('App.paystack.url.webhook')
console.log({ paystackInitiateUrl })
export const initiatePaystackFundingRequest = async (
    payload: FundTransferPayload
) => {
    payload.amount = payload.amount * 100
    const { data } = await axios.post<initiatePaystackFundingResponseInterface>(
        paystackInitiateUrl,
        { ...payload, callback_url: webhook },
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${paystackSecret}`,
            },
        }
    )
    return data



}
