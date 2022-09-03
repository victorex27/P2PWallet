import express from "express";
import config from "config"

const PORT = config.get('App.system.port');
const app = express();

app.listen(PORT, () => {
    console.log(`App listening on Port ${PORT}`);
});