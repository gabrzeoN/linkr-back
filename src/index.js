import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";

import router from "../routers/index.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(chalk.bold.green(`Server online on port ${port}!`)));