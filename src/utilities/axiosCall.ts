import axios from 'axios'
import config from 'config'
import { FundTransferPayload } from '../components/Transaction/TransactionValidator'
import { initiatePaystackFundingResponseInterface, verifyPaystackFundingResponseInterface } from './interface/paystack'

const paystackInitiateUrl: string = config.get('App.paystack.url.inititate')
const paystackSecret: string = config.get('App.paystack.secretKey')
 const paystackVerifyUrl: string = config.get('App.paystack.url.verify')

export const initiatePaystackFundingRequest = async (
    payload: FundTransferPayload
) => {
    payload.amount = payload.amount * 100
    const { data } = await axios.post<initiatePaystackFundingResponseInterface>(
        paystackInitiateUrl,
        payload,
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


export const verifyPaystackTransactionRequest = async (
    referenceId:string
) => {
   console.log(`${paystackVerifyUrl}/${referenceId}`)
    const { data } = await axios.get<verifyPaystackFundingResponseInterface>(
        `${paystackVerifyUrl}/${referenceId}`,

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
