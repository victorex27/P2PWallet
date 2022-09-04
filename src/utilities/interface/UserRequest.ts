import { Request } from 'express'
import { User } from '../../entity/User'

export default interface UserRequest extends Request {
    sender?: User
}
