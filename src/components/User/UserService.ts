import { validate } from "class-validator";
import { User } from "../../entity/User";
import { addASingleUserToDatabase } from "../../utilities/save-user";



export const UserSignUpService = async (user: User) => {

    const newUser = new User();


    newUser.firstName = user?.firstName; 
    newUser.lastName = user?.lastName;
    newUser.password = user?.password;
    newUser.email = user?.email;
    newUser.username = user?.username;

    const errors = await validate(newUser);



    if (errors.length > 0) {
        throw new Error( `Invalid ${errors[0].property}`);
    } else {
        await addASingleUserToDatabase(user);
    }


}
