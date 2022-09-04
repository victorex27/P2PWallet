import app from './app'
import config from 'config'

import { appDataSourceInitializer } from './utilities/app-data-source-initializer'

const PORT = process.env.PORT || config.get('App.system.port')

appDataSourceInitializer

appDataSourceInitializer()
    .then(async () => {
        app.listen(PORT, () => {
            console.log(`App listening on Port ${PORT}`)
        })
    })
    .catch((error) => console.log(error))
