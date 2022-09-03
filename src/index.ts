import app from "./app";
import config from "config"
import { AppDataSource } from "./data-source"

const PORT = config.get('App.system.port');


AppDataSource.initialize().then(async () => {
   

    app.listen(PORT, () => {
        console.log(`App listening on Port ${PORT}`);
    });
    

}).catch(error => console.log(error))