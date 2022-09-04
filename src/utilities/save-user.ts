import bcrypt from 'bcryptjs'
import { AppDataSource } from '../data-source'

import { User } from '../entity/User'

export function addASingleUserToDatabase(user: User) {
    user.password = bcrypt.hashSync(user.password, 10)
    const userRepository = AppDataSource.getRepository(User)

    return userRepository.save(user)
}
