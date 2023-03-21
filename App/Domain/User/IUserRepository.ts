import UserEntity from "./UserEntity";
import PaginationData from "../../Infrastructure/Utils/PaginationData";
import PaginationOptions from "../../Infrastructure/Utils/PaginationOptions";

export interface IUserRepository {
  addUser(user: UserEntity): Promise<void>;

  fetchById(userId: string): Promise<UserEntity>;

  fetchAllUsers(options: PaginationOptions): Promise<PaginationData<UserEntity>>;

  update(user: UserEntity): Promise<void>;

  remove(userId: string): Promise<void>;
}
