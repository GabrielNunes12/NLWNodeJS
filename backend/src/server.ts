import express from 'express';

const app = express();

import "./database"

app.listen(3000, () => console.log('Server is running'));
