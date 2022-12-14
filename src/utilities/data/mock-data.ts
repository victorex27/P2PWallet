export const paystackTransactionSuccessResponse = {
    status: true,
    message: 'Verification successful',
    data: {
        id: 2076260287,
        domain: 'test',
        status: 'success',
        reference: 'e053qtpcdi',
        amount: 20000,
        message: null,
        gateway_response: 'Successful',
        paid_at: '2022-09-04T16:19:37.000Z',
        created_at: '2022-09-04T16:19:19.000Z',
        channel: 'card',
        currency: 'NGN',
        ip_address: '102.89.32.210',
        metadata: '',
        log: {
            start_time: 1662308374,
            time_spent: 3,
            attempts: 1,
            errors: 0,
            success: true,
            mobile: false,
            input: [],
            history: [
                {
                    type: 'action',
                    message: 'Attempted to pay with card',
                    time: 3,
                },
                {
                    type: 'success',
                    message: 'Successfully paid with card',
                    time: 3,
                },
            ],
        },
        fees: 300,
        fees_split: null,
        authorization: {
            authorization_code: 'AUTH_9n4epyibw0',
            bin: '408408',
            last4: '4081',
            exp_month: '12',
            exp_year: '2030',
            channel: 'card',
            card_type: 'visa ',
            bank: 'TEST BANK',
            country_code: 'NG',
            brand: 'visa',
            reusable: true,
            signature: 'SIG_7vcUaFqSMWGhiVP8247W',
            account_name: null,
        },
        customer: {
            id: 93143685,
            first_name: null,
            last_name: null,
            email: 'aobikobe@gmail.com',
            customer_code: 'CUS_iokmnki04fgfqme',
            phone: null,
            metadata: null,
            risk_action: 'default',
            international_format_phone: null,
        },
        plan: null,
        split: {},
        order_id: null,
        paidAt: '2022-09-04T16:19:37.000Z',
        createdAt: '2022-09-04T16:19:19.000Z',
        requested_amount: 20000,
        pos_transaction_data: null,
        source: null,
        fees_breakdown: null,
        transaction_date: '2022-09-04T16:19:19.000Z',
        plan_object: {},
        subaccount: {},
    },
}
