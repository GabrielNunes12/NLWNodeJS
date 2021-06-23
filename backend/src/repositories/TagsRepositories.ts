import { Repository, EntityRepository } from 'typeorm';
import { Tag } from '../model/Tag';

@EntityRepository(Tag)
class TagsRespositories extends Repository<Tag> {
  
}

export { TagsRespositories };