import BaseDTO from "../Utils/BaseDTO";
import PostEntity from "../../Domain/Post/PostEntity";

class UpdatePostDTO extends BaseDTO {
  public post: PostEntity;

  constructor(request) {
    super(request);
    this.allowedRoles = []
    const params = request.body;
    params.postId = request.params.postId
    this.post = PostEntity.create(params)
  }
}

export default UpdatePostDTO;