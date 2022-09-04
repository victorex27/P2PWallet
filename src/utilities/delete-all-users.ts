import { AppDataSource } from '../data-source'
import { User } from '../entity/User'

export const deleteAllUsersFromDatabase = (done: () => void) => {
    const userRepository = AppDataSource.getRepository(User)

    userRepository
        .delete({ firstName: 'amaobi' })
        .then(() => {
            console.log('empty table')
            AppDataSource.destroy().then(() => {
                done()
            })
        })
        .catch((error) => console.log(error))
}
