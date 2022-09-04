process.env.NODE_ENV = 'test'
import app from '../app'
import * as chai from 'chai'
import { request, expect } from 'chai'
import chaiHttp = require('chai-http')
import 'mocha'

import { appDataSourceInitializer } from '../utilities/app-data-source-initializer'
import { addASingleUserToDatabase } from '../utilities/save-user'
import { deleteAllUsersFromDatabase } from '../utilities/delete-all-users'
import { User } from '../entity/User'

chai.use(chaiHttp)

describe('/POST signup', () => {
    // Add a User to the Database
    before((done) => {

        const user = new User()

        user.firstName = 'amaobi'
        user.lastName = 'aduchie'
        user.password = 'fkjhkh978987987987f'
        user.email = 'victorex@gmail.com'
        user.username = 'amaobi05'

        appDataSourceInitializer().then(() => addASingleUserToDatabase(user)).then(() => done())
    })

    // Run teardown
    after((done) => {
        deleteAllUsersFromDatabase(done)
    })

    describe('Missing username field', () => {
        it('should return an error message', () => {
            const body = {
                firstName: 'amaobi',
                lastName: 'obikobe',
                email: 'aobikobe@gmail.com',
                password: 'password',
            }
         
          

            return request(app)
            .post('/api/v1/signup')
            .send(body)
            .then((res) => {
                expect(res.status).to.eql(400)
                expect(res.body.message).to.eql('Invalid username')
            })
            
        })
    })

    describe('Missing firstname field', () => {
        it('should return an error message', () => {
            const body = {
                username: 'amaobi06',
                lastName: 'obikobe',
                email: 'aobikobe@gmail.com',
                password: 'password',
            }
            return request(app)
                .post('/api/v1/signup')
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(400)

                    expect(res.body.message).to.eql('Invalid firstName')
                })
        })
    })

    describe('Missing lastName field', () => {
        it('should return an error message', () => {
            const body = {
                username: 'amaobi06',
                firstName: 'amaobi',
                email: 'aobikobe@gmail.com',
                password: 'password',
            }
            return request(app)
                .post('/api/v1/signup')
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(400)

                    expect(res.body.message).to.eql('Invalid lastName')
                })
        })
    })

    describe('Missing email field', () => {
        it('should return an error message', () => {
            const body = {
                username: 'amaobi06',
                firstName: 'amaobi',
                lastName: 'obikobe',
                password: 'password',
            }
            return request(app)
                .post('/api/v1/signup')
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(400)

                    expect(res.body.message).to.eql('Invalid email')
                })
        })
    })

    describe('Invalid email field', () => {
        it('should return an error message', () => {
            const body = {
                username: 'amaobi06',
                email: 'amaobi',
                firstName: 'amaobi',
                lastName: 'obikobe',
                password: 'password',
            }
            return request(app)
                .post('/api/v1/signup')
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(400)

                    expect(res.body.message).to.eql('Invalid email')
                })
        })
    })

    describe('Missing password field', () => {
        it('should return an error message', () => {
            const body = {
                username: 'amaobi06',
                firstName: 'amaobi',
                lastName: 'obikobe',
                email: 'aobikobe@gmail.com',
            }
            return request(app)
                .post('/api/v1/signup')
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(400)

                    expect(res.body.message).to.eql('Invalid password')
                })
        })
    })

    describe('A username which already exists is used on signup', () => {
        it('should return an error message', () => {
            const body = {
                username: 'amaobi05',
                firstName: 'amaobi',
                lastName: 'obikobe',
                email: 'aobikobe@gmail.com',
                password: 'password',
            }
            return request(app)
                .post('/api/v1/signup')
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(400)

                    expect(res.body.message).to.eql('username already exists')
                })
        })
    })

    describe('Email already exists', () => {
        it('should return an error message', () => {
            const body = {
                username: 'amaobi06',
                firstName: 'amaobi',
                lastName: 'obikobe',
                email: 'victorex@gmail.com',
                password: 'password',
            }
            return request(app)
                .post('/api/v1/signup')
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(400)

                    expect(res.body.message).to.eql('email already exists')
                })
        })
    })

    describe('Non Alphanumeric password is used', () => {
        it('should return an error message', () => {
            const body = {
                username: 'amaobi06',
                firstName: 'amaobi',
                lastName: 'obikobe',
                email: 'aobikobe@gmail.com',
                password: 'password%%%%%',
            }
            return request(app)
                .post('/api/v1/signup')
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(400)

                    expect(res.body.message).to.eql(
                        'Invalid password'
                    )
                })
        })
    })

    describe('A valid object body is passed', () => {
        it('should return a success message', () => {
            const body = {
                username: 'amaobi09',
                firstName: 'amaobi',
                lastName: 'obikobe',
                email: 'aobikobe12@gmail.com',
                password: 'password',
            }
            return request(app)
                .post('/api/v1/signup')
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(201)

                    expect(res.body.message).to.eql(
                        `${body.email} successfully created.`
                    )
                })
        })
    })
})
