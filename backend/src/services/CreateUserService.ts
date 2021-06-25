import { getCustomRepository } from "typeorm"
import { UserRespositories } from "../repositories/UsersRepositories";
import { hash } from 'bcryptjs';

interface RequestUserUUI { 
  name: string, 
  email: string,
  admin?: boolean,
  password: string
}

class CreateUserService {
 async execute({name, email, admin = false, password}: RequestUserUUI) {
  const userRespository = getCustomRepository(UserRespositories);
  
  if(!email) {
    throw new Error(`Email incorrect`);
  }
  
  const alreadyExists = await userRespository.findOne({
    email,
  })
  
  if(alreadyExists) {
    throw new Error(`This user already exists in our database`);
  }

  const passwordHash = await hash(password, 8);

  const user = userRespository.create({
    email,
    name, 
    admin,
    password: passwordHash,
  });
  await userRespository.save(user);
  return user;
 };
}

export { CreateUserService };