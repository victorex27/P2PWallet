import { AppDataSource } from '../data-source'

export const appDataSourceInitializer = () => {
    return AppDataSource.initialize()
}
