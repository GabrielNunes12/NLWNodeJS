import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";

const app = express();

import "./database"

app.use(express.json());

import {router} from "./routes/routes";

app.use(router);

app.use ((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof Error) {
    return response.status(400).json({
      error: err.message
    })
  }
  return response.status(500).json({
    status: "Error",
    message: "Internal Server Error"
  })
})

app.listen(3000, () => console.log('Server is running'));
