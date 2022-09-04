import { AppDataSource } from '../data-source'

import { User } from '../entity/User'

export async function getUserFromDatabase(email: string) {
    const userRepository = AppDataSource.getRepository(User)

    const foundUser = userRepository.findOne({
        select: ['id', 'email', 'password', 'balance'],
        where: {
            email,
        },
    })

    return foundUser
}

export async function getUserByIdFromDatabase(id: number) {
    const userRepository = AppDataSource.getRepository(User)

    const foundUser = userRepository.findOne({
        select: ['id', 'email', 'password', 'balance'],
        where: {
            id,
        },
    })

    return foundUser
}
