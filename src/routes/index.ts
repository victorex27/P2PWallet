import express from 'express';
import UserRoutes from '../components/User';

export default (app: express.Application) => {
    app.use('/api/v1', UserRoutes)
}