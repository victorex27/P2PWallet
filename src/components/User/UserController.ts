import { RequestHandler } from "express";

import { User } from "../../entity/User";
import { UserSignUpService } from "./UserService";
import { UserError } from "../../utilities/errors";

export const UserSignUpController: RequestHandler = async (req, res, next) => {

    try {
        const user = (req.body as User);

        await UserSignUpService(user);



        return res.status(201).send({ message: `${user.email} successfully created.` });

    } catch (error) {

        if (error instanceof Error) {



            next(UserError(error.message))


        } else {
            next(error);
        }




    }


}
