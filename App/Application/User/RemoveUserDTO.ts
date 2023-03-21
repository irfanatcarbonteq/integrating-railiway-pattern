import BaseDTO from "../Utils/BaseDTO";

class RemoveUserDTO extends BaseDTO {
  public userId: string;

  constructor(request) {
    super(request);
    this.allowedRoles = [];
    this.userId = request.params.userId;
  }
}

export default RemoveUserDTO;