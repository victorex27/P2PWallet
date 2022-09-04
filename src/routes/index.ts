import express from 'express'
import UserRoutes from '../components/User'
import TransactionRoutes from '../components/Transaction'

export default (app: express.Application) => {
    app.use('/api/v1', UserRoutes, TransactionRoutes)
}
