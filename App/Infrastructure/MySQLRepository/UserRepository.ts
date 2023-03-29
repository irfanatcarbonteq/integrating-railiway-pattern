import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import UserEntity from "../../Domain/User/UserEntity";
import PaginatedData from "../../Domain/Utils/PaginatedData";
import {IUserRepository} from "../../Domain/User/IUserRepository";
import {injectable} from "tsyringe";

const User = prisma.user;

@injectable()
class UserRepository implements IUserRepository {

  async addUser(user: UserEntity): Promise<void> {
    await User.create({
      data: user
    });
  }

  async fetchAllUsers(paginationOptions): Promise<PaginatedData<UserEntity>> {
    const count = await User.count();
    const userObjs = await User.findMany({
      skip: paginationOptions.offset(),
      take: paginationOptions.limit(),
    })
    const paginatedData: PaginatedData<UserEntity> = new PaginatedData<UserEntity>(paginationOptions, count)
    userObjs.forEach(userObj => {
      const user = UserEntity.create(userObj);
      paginatedData.addItem(user)
    });
    return paginatedData;
  }

  async fetchById(userId: string): Promise<any> {
    const userObj = await User.findUnique({
      where: {
        userId: userId,
      },
    })
    if (!userObj) {
      throw new Error("Invalid User details");
    }
    return UserEntity.create(userObj);
  }

  async update(user: UserEntity): Promise<void> {
    await User.update({
      where: {
        userId: user.userId,
      },
      data: user    })
  }

  async remove(userId: string): Promise<void> {
    await User.delete({
      where: {
        userId: userId,
      },
    })
  }

}

export default UserRepository;

