import express, { json } from 'express';
import chalk from 'chalk';
import cors from 'cors'
import dotenv from 'dotenv'
import router from "./Routers/index.js";

dotenv.config();

const app = express()

app.use(cors());
app.use(json());
app.use(router);

const PORT = 5000; // || process.env.PORT

app.listen(PORT, () => {
    console.log(chalk.bold.bgGreen(`Rodando em: ${PORT}`))  
});
