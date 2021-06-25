import { Request, Response, NextFunction } from "express";

import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

  //Recuperar token das pessoas
  const token = request.headers.authorization;

  //token formatado
  const formaterToken = token.split('Bearer ');

  if(!formaterToken) {
    return response.status(400).end();
  }
  
  //token válido
  try{
    const { sub } = verify(formaterToken[1],'1d9f50e70eff04adda62f66b2edba187') as IPayload;
    //recuperando a info do user
    request.user_id = sub;
    return next();
  } catch(err) {
    return response.status(401).end();
  }

}