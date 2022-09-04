import { IsEmail, IsNumber, Min } from 'class-validator'

export class FundTransferPayload {
    @IsEmail()
    email: string

    @IsNumber()
    @Min(10000, {message:'Mininum amount of 10000. Value is in kobo.'})
    amount: number
}
