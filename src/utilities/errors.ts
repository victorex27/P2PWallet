import ErrorWithStatusCode from "./interface/ErrorWithStatusCode";



const CustomError = (name:string, code: number, message:string)=>{

    const err: ErrorWithStatusCode = {
        name,
        message,
        code
    }
    return err;
} 

export const UserError = (message: string)=>{
    return CustomError('User Error', 400, message);
}

export const AuthenticationError = (message: string)=>{
    return CustomError('Authorizatoion Error', 401, message);
}


export const ForbiddenError = (message: string)=>{
    return CustomError('Authorizatoion Error', 403, message);
}


export const NotFoundError = (message: string)=>{
    return CustomError('NotFound Error', 404, message);
}

export const InteervalServerError = (message: string)=>{
    return CustomError('Internal Server Error', 500, message);
}