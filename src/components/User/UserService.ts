import { validate } from 'class-validator'
import bcrypt from 'bcryptjs'
import { User } from '../../entity/User'
import { getUserFromDatabase } from '../../utilities/get-user'
import { addASingleUserToDatabase } from '../../utilities/save-user'
import { AttemptingLoginUser } from './UserValidator'
import { UserError, AuthenticationError } from '../../utilities/errors'

export const UserSignUpService = async (user: User) => {
    const newUser = new User()

    newUser.firstName = user?.firstName
    newUser.lastName = user?.lastName
    newUser.password = user?.password
    newUser.email = user?.email
    newUser.username = user?.username

    const errors = await validate(newUser)

    if (errors.length > 0) {
        throw UserError(`Invalid ${errors[0].property}`)
    }

    await addASingleUserToDatabase(user)
}

export const UserLoginService = async (user: AttemptingLoginUser) => {
    const newUser = new AttemptingLoginUser()

    newUser.email = user?.email
    newUser.password = user?.password

    const errors = await validate(newUser)

    if (errors.length > 0) {
        throw UserError(`Invalid ${errors[0].property}`)
    }

    const foundUser = await getUserFromDatabase(user.email)

    if (!foundUser) throw AuthenticationError('Invalid login attempt')

    const verified = bcrypt.compareSync(newUser.password, foundUser.password)

    if (!verified) throw AuthenticationError('Invalid login attempt')

    return foundUser
}
