import { injectable, inject } from "tsyringe";
import container from "../../../../../App/Infrastructure/IocContainer/container";
import UserService from "../../../../../App/Application/User/UserService";
import CreateUserDTO from "../../../../../App/Application/User/CreateUserDTO";
import FetchAllUsersDTO from "../../../../../App/Application/User/FetchAllUsersDTO";
import UpdateUserDTO from "../../../../../App/Application/User/UpdateUserDTO";
import FetchUserByIdDTO from "../../../../../App/Application/User/FetchUserByIdDTO";
import RemoveUserDTO from "../../../../../App/Application/User/RemoveUserDTO";

container.resolve(UserService);

@injectable()
class UserController {
  constructor(@inject("UserService") private userService: UserService) {}

  createUser = async (request, response) => {
    const input = new CreateUserDTO(request);
    const result = await this.userService.createUser(input);
    response.send(result);
  };

  fetchAllUsers = async (request, response) => {
    const input = new FetchAllUsersDTO(request);
    const result = await this.userService.fetchAllUsers(input);
    response.send(result);
  };

  updateUser = async (request, response) => {
    const input = new UpdateUserDTO(request);
    const appResult = await this.userService.updateUser(input);
  };

  fetchUserById = async (request, response) => {
    const input = new FetchUserByIdDTO(request);
    const appResult = await this.userService.fetchUserById(input);
  };

  removeUser = async (request, response) => {
    const input = new RemoveUserDTO(request);
    const appResult = await this.userService.removeUser(input);
  };
}

export default UserController;
