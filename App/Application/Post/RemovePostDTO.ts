import BaseDTO from "../Utils/BaseDTO";

class RemovePostDTO extends BaseDTO {
  public postId: string;

  constructor(request) {
    super(request);
    this.allowedRoles = [];
    this.postId = request.params.postId;
  }
}

export default RemovePostDTO;