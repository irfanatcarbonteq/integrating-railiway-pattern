import BaseDTO from "../Utils/BaseDTO";

class FetchUserByIdDTO extends BaseDTO {
  public userId: string;

  constructor(request) {
    super(request);
    this.allowedRoles = []
    this.userId = request.params.userId
  }
}

export default FetchUserByIdDTO;