import { AppDataSource } from '../data-source'
import { User } from '../entity/User'

const user = new User()

user.firstName = 'amanda'
user.lastName = 'aduchie'
user.password = 'fkjhkh978987987987f'
user.email = 'victorex@gmail.com'
user.username = 'amaobi05'

export function addASingleUserToDatabase(done: () => void) {
    const userRepository = AppDataSource.getRepository(User)

    userRepository
        .save(user)
        .then(() => {
            done()
        })
        .catch((err) => console.log(err))
}
