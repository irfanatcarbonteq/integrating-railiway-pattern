import { inject, injectable } from "tsyringe";
import { AppResult, AppError } from "@carbonteq/hexapp";
import { Ok, Err } from "oxide.ts";
import { IUserRepository } from "../../Domain/User/IUserRepository";
import PaginatedData from "../../Domain/Utils/PaginatedData";
import CreateUserDTO from "./CreateUserDTO";
import FetchAllUsersDTO from "./FetchAllUsersDTO";
import UpdateUserDTO from "./UpdateUserDTO";
import FetchUserByIdDTO from "./FetchUserByIdDTO";
import RemoveUserDTO from "./RemoveUserDTO";
import UserEntity from "../../Domain/User/UserEntity";
import HttpResp from "../Utils/HttpResp";
import HttpStatusCode from "../Utils/HttpStatusCode";

@injectable()
class UserService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async createUser(createUserDTO: CreateUserDTO) {
    try {
      createUserDTO.hasAccess();
      const user: UserEntity = createUserDTO.user;
      await this.userRepository.addUser(user.toObject());
      return HttpResp.create(HttpStatusCode.OK, user.toObject());
    } catch (e) {
      return HttpResp.create(HttpStatusCode.ERROR, {
        status: "error",
        message: e.message,
      });
    }
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
    return AppResult.fromResult(Ok({ message: "successful" }));
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
