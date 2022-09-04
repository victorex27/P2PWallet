import axios from 'axios';
import config from 'config';
import { FundTransferPayload } from '../components/Transaction/TransactionValidator';


const paystackInitiateUrl: string = config.get("App.paystack.url.initiate");
const paystackSecret: string = config.get("App.paystack.secretKey");


interface initiatePaystackFundingRequestInterface {

    status: boolean,
    authorization_url: string,
    access_code: string,
    reference: string

}


export const initiatePaystackFundingRequest = async (payload: FundTransferPayload) => {


    const { data } = await axios.post<initiatePaystackFundingRequestInterface>(
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
