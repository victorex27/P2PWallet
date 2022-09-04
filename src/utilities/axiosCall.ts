import axios from 'axios';
import config from 'config';
import { FundTransferPayload } from '../components/Transaction/TransactionValidator';
import { initiatePaystackFundingResponseInterface } from './interface/paystack';


const paystackInitiateUrl: string = config.get("App.paystack.url.inititate");
const paystackSecret: string = config.get("App.paystack.secretKey");





export const initiatePaystackFundingRequest = async (payload: FundTransferPayload) => {


    const { data } = await axios.post<initiatePaystackFundingResponseInterface>(
        paystackInitiateUrl,
        payload,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${paystackSecret}`,
            },
        },
    );

    return data;

}
