import jwt from 'jsonwebtoken'
import config from 'config'
import { User } from '../entity/User'
// import User from './interface/User'


const JWT_SECRET_KEY = config.get('App.system.jwt.secretKey') as string

export const signJWTPayload = (obj: User) => {
    // obj.password = "";
    return jwt.sign( {...obj}, JWT_SECRET_KEY, { expiresIn: '15m' })
}

export const validateJWTToken = (token: string) => {

    const user = (jwt.verify(token.substring(7), JWT_SECRET_KEY)) as User;

    return user;


}
