import BaseDTO from "../Utils/BaseDTO";
import UserEntity from "../../Domain/User/UserEntity";

class CreateUserDTO extends BaseDTO {
  public userId: string;
  public user: UserEntity;
  
  constructor(request) {
    super(request);
    this.allowedRoles = []
    const params = request.body;
    params.userId = UserEntity.generateId();
    this.user = UserEntity.create(params);
  }

}

export default CreateUserDTO;