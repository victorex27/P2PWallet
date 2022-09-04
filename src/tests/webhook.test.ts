process.env.NODE_ENV = 'test'

import app from '../app'
import config from 'config';
import * as chai from 'chai'
import { request, expect } from 'chai'
import chaiHttp = require('chai-http')
import 'mocha'
import { transferSuccessResponse } from '../utilities/data/mock-data';

chai.use(chaiHttp)


const invalidToken = 'Bearer kkhkjhkjh'


const validToken: string = config.get('App.paystack.secretKey');



describe('/POST /paystack/webhook', () => {
   

    describe('User is trying to use webhook without paystack authourization header', () => {
        it('should return a success message', () => {

            return request(app)
                .post('/api/v1/paystack/webhook')
                .then((res) => {
                    expect(res.status).to.eql(403)

                    expect(res.body.message).to.eql('You are not permitted to access resource')
                })
        })
    })

    describe('User is trying to access webhook with authorized signature', () => {
        it('should return a success message', () => {

            return request(app)
                .post('/api/v1/paystack/webhook')
                .set('x-paystack-signature', invalidToken)
                .then((res) => {
                    expect(res.status).to.eql(403)

                    expect(res.body.message).to.eql(`invalid signature`)
                })
        })
    })






    describe('A valid object body is passed', () => {
        it('should return a success message', () => {
            const body = transferSuccessResponse;

            

            return request(app)
                .post('/api/v1/paystack/webhook')
                .set('Authorization', validToken)
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(200)
                    expect(res.body.message).to.eql('Updated Database')
                })
        })
    })
})
