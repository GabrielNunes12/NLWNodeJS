import { getCustomRepository } from "typeorm";

import { compare } from 'bcryptjs';

import { sign } from 'jsonwebtoken';

import { UserRespositories } from "../repositories/UsersRepositories";

interface Authentication {
  email: string,
  password: string,
}

class AuthenticateUserService {
  async execute({email, password}: Authentication) {
    const userRepositories = getCustomRepository(UserRespositories);

    const user = await userRepositories.findOne({
      email,
    });

    if(!user) {
      throw new Error("Email/Password incorrect");
    }
    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error("Email/Password incorrect");
    }

    const token = sign({
      email: user.email,
    }, '1d9f50e70eff04adda62f66b2edba187', {
      subject: user.id,
      expiresIn: "1d",
    });
    return token;
  };
}

export { AuthenticateUserService };