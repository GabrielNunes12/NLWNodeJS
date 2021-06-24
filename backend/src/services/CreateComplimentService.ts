import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UserRespositories } from "../repositories/UsersRepositories";


interface ComplimentsServices {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {
  async execute({ tag_id, user_sender, user_receiver, message }: ComplimentsServices) {

    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

    const userRepositories = getCustomRepository(UserRespositories);

    if (user_sender === user_receiver) {
      throw new Error('Compliments denied to the same user');
    }

    const userReceiverExists = await userRepositories.findOne(user_receiver)

    if (!userReceiverExists) {
      throw new Error('User receiver not found');
    }

    const compliment = complimentsRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message,
    });

    await complimentsRepositories.save(compliment);
    return compliment;
  }
}

export { CreateComplimentService };