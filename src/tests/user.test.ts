process.env.NODE_ENV = 'test'
import config from 'config'
import app from '../app'
import * as chai from 'chai'
import { request, expect } from 'chai'
import chaiHttp = require('chai-http')
import 'mocha'

import { AppDataSource } from '../data-source'
import { appDataSourceInitializer } from '../utilities/app-data-source-initializer'
import { addASingleUserToDatabase } from '../utilities/save-user'
import { deleteAllUsersFromDatabase } from '../utilities/delete-all-users'

chai.use(chaiHttp)

describe('/POST signup', () => {
    // Add a User to the Database
    before((done) => {
        appDataSourceInitializer().then(() => addASingleUserToDatabase(done))
    })

    // Run teardown
    after((done) => {
        deleteAllUsersFromDatabase(done)
    })

    describe('Missing username field', () => {
        it('should return an error message', async (done) => {
            const body = {
                firstName: 'amaobi',
                lastName: 'obikobe',
                email: 'aobikobe@gmail.com',
                password: 'password',
            }
            const res = await request(app).post('/signup').send(body)
            expect(res.status).to.eql(400)
            expect(res.body.message).to.eql('username is required')
            done()
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
                .post('/signup')
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(400)

                    expect(res.body.message).to.eql('firstName is required')
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
                .post('/signup')
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(400)

                    expect(res.body.message).to.eql('lastName is required')
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
                .post('/signup')
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(400)

                    expect(res.body.message).to.eql('email is required')
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
                .post('/signup')
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(400)

                    expect(res.body.message).to.eql('invalid email')
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
                .post('/signup')
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(400)

                    expect(res.body.message).to.eql('password is required')
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
                .post('/signup')
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
                email: 'aobikobe@gmail.com',
                password: 'password',
            }
            return request(app)
                .post('/signup')
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
                password: 'password',
            }
            return request(app)
                .post('/signup')
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(400)

                    expect(res.body.message).to.eql(
                        'password must be alphanumeric'
                    )
                })
        })
    })

    describe('A valid object body is passed', () => {
        it('should return a success message', () => {
            const body = {
                username: 'amaobi06',
                firstName: 'amaobi',
                lastName: 'obikobe',
                email: 'aobikobe@gmail.com',
                password: 'password',
            }
            return request(app)
                .post('/signup')
                .send(body)
                .then((res) => {
                    expect(res.status).to.eql(200)

                    expect(res.body.message).to.eql(
                        `${body.email} successfully created.`
                    )
                })
        })
    })
})
