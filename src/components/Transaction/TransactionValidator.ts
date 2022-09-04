import { IsEmail, IsNumber, Min } from 'class-validator'

export class FundTransferPayload {
    @IsEmail()
    email: string

    @IsNumber()
    @Min(5)
    amount: number
}
