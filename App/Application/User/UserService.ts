import { inject, injectable } from "tsyringe";
import { AppResult } from "@carbonteq/hexapp";
import { Ok, Err } from "oxide.ts";
import { IUserRepository } from "../../Domain/User/IUserRepository";
import PaginatedData from "../../Domain/Utils/PaginatedData";
import CreateUserDTO from "./CreateUserDTO";
import FetchAllUsersDTO from "./FetchAllUsersDTO";
import UpdateUserDTO from "./UpdateUserDTO";
import FetchUserByIdDTO from "./FetchUserByIdDTO";
import RemoveUserDTO from "./RemoveUserDTO";
import UserEntity from "../../Domain/User/UserEntity";

@injectable()
class UserService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async createUser(createUserDTO: CreateUserDTO) {
    createUserDTO.hasAccess();
    const user: UserEntity = createUserDTO.user;
    return AppResult.fromResult(Err(new Error("Email already exists")));
    await this.userRepository.addUser(user.toObject());
    return AppResult.fromResult(Ok("successful"));
  }

  async fetchAllUsers(fetchAllUsersDTO: FetchAllUsersDTO) {
    const { paginationOptions } = fetchAllUsersDTO;
    fetchAllUsersDTO.hasAccess();
    const response: PaginatedData<UserEntity> = await this.userRepository.fetchAllUsers(
      paginationOptions
    );
    return AppResult.fromResult(Ok(response.getPaginatedData()));
  }

  async updateUser(updateUserDTO: UpdateUserDTO) {
    updateUserDTO.hasAccess();
    const user: UserEntity = updateUserDTO.user;
    await this.userRepository.update(user.toObject());
    return AppResult.fromResult(Ok("successful"));
  }

  async fetchUserById(fetchUserByIdDTO: FetchUserByIdDTO) {
    const { userId } = fetchUserByIdDTO;
    fetchUserByIdDTO.hasAccess();
    const response: UserEntity = await this.userRepository.fetchById(userId);
    return AppResult.fromResult(Ok({ data: response }));
  }

  async removeUser(removeUserDTO: RemoveUserDTO) {
    removeUserDTO.hasAccess();
    await this.userRepository.remove(removeUserDTO.userId);
    return AppResult.Ok({ message: "User deleted Successfully" });
  }
}

export default UserService;
