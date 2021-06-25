import { Repository,  EntityRepository } from 'typeorm';
import { Compliments } from '../model/Compliments';

@EntityRepository(Compliments)
class ComplimentsRepositories extends Repository<Compliments>{

}

export { ComplimentsRepositories };