import { getCustomRepository } from "typeorm"
import { UserRespositories } from "../repositories/UsersRepositories";
interface RequestUserUUI { 
  name: string, 
  email: string,
  admin?: boolean
}

class CreateUserService {
 async execute({name, email, admin}: RequestUserUUI) {
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

  const user = userRespository.create({
    email,
    name, 
    admin,
  });
  await userRespository.save(user);
  return user;
 };
}

export { CreateUserService };