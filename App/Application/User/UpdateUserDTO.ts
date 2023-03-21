import BaseDTO from "../Utils/BaseDTO";
import UserEntity from "../../Domain/User/UserEntity";

class UpdateUserDTO extends BaseDTO {
  public user: UserEntity;

  constructor(request) {
    super(request);
    this.allowedRoles = []
    const params = request.body;
    params.userId = request.params.userId
    this.user = UserEntity.create(params)
  }
}

export default UpdateUserDTO;