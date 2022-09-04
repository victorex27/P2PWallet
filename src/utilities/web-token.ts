import jwt from 'jsonwebtoken'
import config from 'config'
import User from './interface/User'


const JWT_SECRET_KEY = config.get('App.system.jwt.secretKey') as string

export const signJWTPayload = (obj: User) => {
    return jwt.sign(obj, JWT_SECRET_KEY, { expiresIn: '15m' })
}

export const validateJWTToken = (token: string) => {
    console.log( token.substring(7))

    const user = (jwt.verify(token.substring(7), JWT_SECRET_KEY)) as User;

    return user;


}
