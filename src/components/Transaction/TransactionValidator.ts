import { IsEmail, IsNumber, Min } from 'class-validator'

export class FundTransferPayload {
    @IsEmail()
    email: string

    @IsNumber()
    @Min(100)
    amount: number
}
