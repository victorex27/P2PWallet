import express, { Request, Response, NextFunction} from 'express'
import routes from './routes';
import ErrorWithStatusCode from './utilities/interface/ErrorWithStatusCode';

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


routes(app);






app.use( (error: ErrorWithStatusCode, req: Request,res: Response, next: NextFunction)=>{


 
        return res.status(error?.code || 500).send({message: error.message});
  

});

export default app
