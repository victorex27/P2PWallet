import {  Response, NextFunction } from 'express'
import { AuthenticationError, NotFoundError, UserError } from '../../utilities/errors';
import { getUserFromDatabase } from '../../utilities/get-user';

import UserRequest from '../../utilities/interface/UserRequest';
import { validateJWTToken } from '../../utilities/web-token';
import { FundTransferPayload } from './TransactionValidator';



export const GetSenderMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization as string;


        const user = validateJWTToken(token);

        const doesUserExist = await getUserFromDatabase(user.email);

        if (!doesUserExist) {
            throw NotFoundError('User not found');
        }

        console.log({doesUserExist});
        req.sender = doesUserExist;



        next();
    } catch (error) {
        if( error instanceof Error)
            next( AuthenticationError(error.message))
        else 
            next(AuthenticationError('Invalid token'))
    }
}

export const doesUserHaveSufficientBalance = async (req: UserRequest, res: Response, next: NextFunction) => {
    
       


        const user = req.sender;
        const payload = req.body as FundTransferPayload

        if (!user) {
            return next(NotFoundError('User not found'));
        }

        console.log({payload, user})


        if(payload.amount > user.balance )
            return next( UserError('Insufficient balance'))

        next();
   
}

export const isUserEmailTheSameWithRecipient = async (req: UserRequest, res: Response, next: NextFunction) => {
    
       


    const user = req.sender;
    const payload = req.body as FundTransferPayload

    if (!user) {
        return next(NotFoundError('User not found'));
    }

    if(payload.email === user.email )
        return next(UserError('User cannot send funds to own account.'))

    next();

}