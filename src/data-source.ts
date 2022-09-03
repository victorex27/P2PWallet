import 'reflect-metadata'
import config from 'config'
import { DataSource, DataSourceOptions } from 'typeorm'
import { User } from './entity/User'
import { Transaction } from './entity/Transactions'
import { UserAndTransactionRecord1662226287648 } from './migration/1662226287648-User-And-Transaction-Record'

const DatabaseConfiguration: DataSourceOptions = config.get('App.database')

export const AppDataSource = new DataSource({
    ...DatabaseConfiguration,
    synchronize: false,
    logging: false,
    entities: [User, Transaction],
    migrations: [UserAndTransactionRecord1662226287648],
    subscribers: [],
})
