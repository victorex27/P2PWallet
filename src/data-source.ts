import 'reflect-metadata'
import config from 'config'
import { DataSource, DataSourceOptions } from 'typeorm'
import { User } from './entity/User'
import { PaystackTransaction } from './entity/PaystackTransaction'
import { FundTransfer } from './entity/FundTransfer'
import { UserAndTransactionRecord1662290547120 } from './migration/1662290547120-User-And-Transaction-Record'
import { UserAndTransactionRecord1662301436259 } from './migration/1662301436259-User-And-Transaction-Record'

const DatabaseConfiguration: DataSourceOptions = config.get('App.database')

export const AppDataSource = new DataSource({
    ...DatabaseConfiguration,
    synchronize: false,
    logging: false,
    entities: [User, PaystackTransaction, FundTransfer],
    migrations: [
        UserAndTransactionRecord1662290547120,
        UserAndTransactionRecord1662301436259,
    ],
    subscribers: [],
})
