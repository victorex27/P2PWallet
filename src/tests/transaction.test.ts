process.env.NODE_ENV = 'test'
import app from '../app'
import * as chai from 'chai'
import { request, expect } from 'chai'
import chaiHttp = require('chai-http')
import 'mocha'

import { appDataSourceInitializer } from '../utilities/app-data-source-initializer'
import { addASingleUserToDatabase } from '../utilities/save-user'
import {
    deleteAllFundTransferFromDatabase,
    deleteAllUsersFromDatabase,
} from '../utilities/delete-all-users'
import { User } from '../entity/User'
import { signJWTPayload } from '../utilities/web-token'
import { getUserFromDatabase } from '../utilities/get-user'

chai.use(chaiHttp)

const expiredToken =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoiYW1hbmRhQGdtYWlsLmNvbSIsImJhbGFuY2UiOjAsImlhdCI6MTY2MjI3OTQ5OCwiZXhwIjoxNjYyMjgwMzk4fQ.DiwxnkfneXJAnNatF8dXWASdaBSi8mIYTE_IFaZpHOk'

const invalidToken = 'Bearer kkhkjhkjh'

const user1 = new User()
const user2 = new User()

user1.firstName = 'amaobi'
user1.lastName = 'aduchie'
user1.password = 'fkjhkh978987987987f'
user1.email = 'victorex@gmail.com'
user1.username = 'amaobi05'
user1.balance = 110

user2.firstName = 'amaobi'
user2.lastName = 'aduchie'
user2.password = 'fkjhkh978987987987f'
user2.email = 'aobikobe@gmail.com'
user2.username = 'amaobi09'
user2.balance = 110

const validToken = `Bearer ${signJWTPayload(user1)}`

describe('/POST /transfer/fund', () => {
    // Add a User to the Database
    before((done) => {
        appDataSourceInitializer()
            .then(() => {
                addASingleUserToDatabase(user1)
                addASingleUserToDatabase(user2)
            })
            .then(() => done())
    })

    // Run teardown
    after((done) => {
        deleteAllFundTransferFromDatabase().then(() =>
            deleteAllUsersFromDatabase(done)
        )
    })

    describe('User tries to transfer without login in', () => {
        it('should return a success message', () => {
            const body = {
                amount: 1000,
                email: 'aobikobe@gmail.com',
            }
            return request(app)
                .post('/api/v1/transfer/fund')
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(401)

                    expect(res.body.message).to.eql('Invalid token')
                })
        })
    })

    describe('User tries to transfer with expired token ', () => {
        it('should return a success message', () => {
            const body = {
                amount: 1000,
                email: 'aobikobe@gmail.com',
            }
            return request(app)
                .post('/api/v1/transfer/fund')
                .set('Authorization', expiredToken)
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(401)

                    expect(res.body.message).to.eql(`invalid signature`)
                })
        })
    })

    describe('User tries to transfer with invalid token ', () => {
        it('should return a success message', () => {
            const body = {
                amount: 1000,
                email: 'aobikobe@gmail.com',
            }
            return request(app)
                .post('/api/v1/transfer/fund')
                .set('Authorization', invalidToken)
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(401)

                    expect(res.body.message).to.eql(`jwt malformed`)
                })
        })
    })

    describe('Missing amount field', () => {
        it('should return an error message', () => {
            const body = {
                email: 'aobikobe@gmail.com',
            }

            return request(app)
                .post('/api/v1/transfer/fund')
                .set('Authorization', validToken)
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(400)
                    expect(res.body.message).to.eql('Invalid amount')
                })
        })
    })

    describe('Invalid amount is passed', () => {
        it('should return an error message', () => {
            const body = {
                amount: -10,
                email: 'aobikobe@gmail.com',
            }

            return request(app)
                .post('/api/v1/transfer/fund')
                .set('Authorization', validToken)
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(400)
                    expect(res.body.message).to.eql('Invalid amount')
                })
        })
    })

    describe('Invalid amount is passed', () => {
        it('should return an error message', () => {
            const body = {
                amount: 'ama',
                email: 'aobikobe@gmail.com',
            }

            return request(app)
                .post('/api/v1/transfer/fund')
                .set('Authorization', validToken)
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(400)
                    expect(res.body.message).to.eql('Invalid amount')
                })
        })
    })

    describe('No recipient is passed', () => {
        it('should return an error message', () => {
            const body = {
                amount: 10,
            }
            return request(app)
                .post('/api/v1/transfer/fund')
                .set('Authorization', validToken)
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(400)

                    expect(res.body.message).to.eql('Invalid email')
                })
        })
    })

    describe('Recipient is not an email type', () => {
        it('should return an error message', () => {
            const body = {
                amount: 10,
                email: 'amaobi',
            }
            return request(app)
                .post('/api/v1/transfer/fund')
                .set('Authorization', validToken)
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(400)

                    expect(res.body.message).to.eql('Invalid email')
                })
        })
    })

    describe('Recipient does not exist', () => {
        it('should return an error message', () => {
            const body = {
                amount: 100,
                email: 'amaobi889809@gmail.com',
            }
            return request(app)
                .post('/api/v1/transfer/fund')
                .set('Authorization', validToken)
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(404)

                    expect(res.body.message).to.eql(
                        'Recipient account not found'
                    )
                })
        })
    })

    describe('User tries to send fund to oneself', () => {
        it('should return an error message', () => {
            const body = {
                amount: 100,
                email: 'victorex@gmail.com',
            }
            return request(app)
                .post('/api/v1/transfer/fund')
                .set('Authorization', validToken)
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(400)

                    expect(res.body.message).to.eql(
                        'User cannot send funds to own account.'
                    )
                })
        })
    })

    describe('When a user tries to send funds above user limit', () => {
        it('should return a success message', () => {
            const body = {
                amount: 1000,
                email: 'aobikobe@gmail.com',
            }
            return request(app)
                .post('/api/v1/transfer/fund')
                .set('Authorization', validToken)
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(400)

                    expect(res.body.message).to.eql(`Insufficient balance`)
                })
        })
    })

    describe('A valid object body is passed', () => {
        it('should return a success message', () => {
            const body = {
                amount: 100,
                email: 'aobikobe@gmail.com',
            }
            return request(app)
                .post('/api/v1/transfer/fund')
                .set('Authorization', validToken)
                .send(body)
                .then((res) => {
                    /**
                     * TODO
                     * GEt recipient and confirm that money was received
                     *
                     */
                    getUserFromDatabase(body.email).then((user) => {
                        expect(user?.balance).to.eql(
                            user2.balance + body.amount
                        )
                        expect(res.status).to.eql(201)

                        expect(res.body.message).to.eql(
                            'Transfer was successful'
                        )
                    })
                })
        })
    })
})
