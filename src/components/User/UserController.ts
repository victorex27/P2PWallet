import { RequestHandler } from 'express'

import { User } from '../../entity/User'
import { UserSignUpService, UserLoginService } from './UserService'
import { AttemptingLoginUser } from './UserValidator'
import { signJWTPayload } from '../../utilities/web-token'

export const UserSignUpController: RequestHandler = async (req, res, next) => {
    try {
        const user = req.body as User

        await UserSignUpService(user)

        return res
            .status(201)
            .send({ message: `${user.email} successfully created.` })
    } catch (error) {
        next(error)
    }
}

export const UserLoginController: RequestHandler = async (req, res, next) => {
    try {
        const user = req.body as AttemptingLoginUser

        const foundUser = await UserLoginService(user)

        return res.status(200).send({
            token: signJWTPayload(foundUser),
            message: `${user.email} login attempt successful.`,
        })
    } catch (error) {
        next(error)
    }
}
