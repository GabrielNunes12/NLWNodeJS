import {EntityRepository, Repository} from "typeorm";
import { User } from "../model/User";

@EntityRepository(User)
class UserRespositories extends Repository<User> {

}

export { UserRespositories };