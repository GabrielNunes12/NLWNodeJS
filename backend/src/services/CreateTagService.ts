import { TagsRespositories } from "../repositories/TagsRepositories";
import { getCustomRepository } from "typeorm";

interface TagUUI {
  name: string;
}

class CreateTagService {
  async execute(name: string) {
    const tagsRepositories = getCustomRepository(TagsRespositories);

    if(!name) {
      throw new Error(`Incorrect name`);
    };

    const tagsAlreadyExists = await tagsRepositories.findOne({ 
      name,
    });

    if(tagsAlreadyExists) {
      throw new Error(`Tags already exists`);
    };

    const tags = tagsRepositories.create({ 
      name,
    });

    await tagsRepositories.save(tags);

    return tags;
  };
}

export { CreateTagService };