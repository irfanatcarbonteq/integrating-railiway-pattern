import BaseDTO from "../Utils/BaseDTO";

class FetchPostByIdDTO extends BaseDTO {
  public postId: string;

  constructor(request) {
    super(request);
    this.allowedRoles = []
    this.postId = request.params.postId
  }
}

export default FetchPostByIdDTO;