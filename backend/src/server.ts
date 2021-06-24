import express from 'express';

const app = express();

import "./database"

app.use(express.json());

import {router} from "./routes/routes";

app.use(router);

app.listen(3000, () => console.log('Server is running'));
