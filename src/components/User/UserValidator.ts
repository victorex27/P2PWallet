import { IsEmail, IsAlphanumeric } from 'class-validator'

export class AttemptingLoginUser {
    @IsEmail()
    email: string

    @IsAlphanumeric()
    password: string
}
