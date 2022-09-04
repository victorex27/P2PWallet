import { validate } from 'class-validator'
import { getUserFromDatabase } from '../../utilities/get-user'
import { UserError, NotFoundError } from '../../utilities/errors'
import { FundTransferPayload } from './TransactionValidator'
import { performFundTransfer } from '../../utilities/update-user-balance'
import * as UserInterface from '../../utilities/interface/User';

export const FundTransferService = async (payload: FundTransferPayload, sender: UserInterface.default) => {
    const validator = new FundTransferPayload()

    validator.amount = payload?.amount;
    validator.email = payload?.email;

    const errors = await validate(validator)

    if (errors.length > 0) {
        throw UserError(`Invalid ${errors[0].property}`)
    }

    const recipient = await getUserFromDatabase(validator.email);

    if(!recipient) throw NotFoundError('Recipient account not found');

    const receivingUser: FundTransferPayload = { email: validator.email , amount: recipient.balance + validator.amount};
    const sendingUser: FundTransferPayload = { email: sender.email , amount: sender.balance - validator.amount};

    await performFundTransfer( sendingUser, receivingUser );
}