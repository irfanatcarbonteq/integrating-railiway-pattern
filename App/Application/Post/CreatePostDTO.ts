import BaseDTO from "../Utils/BaseDTO";
import PostEntity from "../../Domain/Post/PostEntity";

class CreatePostDTO extends BaseDTO {
  public postId: string;
  public post: PostEntity;
  
  constructor(request) {
    super(request);
    this.allowedRoles = []
    const params = request.body;
    params.postId = PostEntity.generateId();
    this.post = PostEntity.create(params);
  }

}

export default CreatePostDTO;