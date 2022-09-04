import STATUS from "../status"

export interface initiatePaystackFundingResponseInterface {
    status: boolean
    message: string
    data: {
        authorization_url: string
        access_code: string
        reference: string
    }
}



export interface verifyPaystackFundingResponseInterface {
    status: string
    message: string
    data: {
        authorization_url: string
        access_code: string
        reference: string
        status: STATUS,
        channel: string,
        id: string
        fees: string,
        amount: number
    }
}