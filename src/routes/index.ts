import express from 'express';
import UserRoutes from '../components/UserSignUp';

export default (app: express.Application) => {
    app.use('/api/v1', UserRoutes)
}