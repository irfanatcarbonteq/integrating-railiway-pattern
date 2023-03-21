import {inject, injectable} from "tsyringe";
import {IPostRepository} from "../../Domain/Post/IPostRepository";
import AppResult from "../Utils/AppResult";
import PaginatedData from "../../Domain/Utils/PaginatedData";
import CreatePostDTO from "./CreatePostDTO";
import FetchAllPostsDTO from "./FetchAllPostsDTO";
import UpdatePostDTO from "./UpdatePostDTO";
import FetchPostByIdDTO from "./FetchPostByIdDTO";
import RemovePostDTO from "./RemovePostDTO";
import PostEntity from "../../Domain/Post/PostEntity";

@injectable()
class PostService {
  constructor(@inject("PostRepository") private postRepository: IPostRepository) {
  }

  async createPost(createPostDTO: CreatePostDTO): Promise<AppResult> {
    try {
      createPostDTO.hasAccess();
      const post: PostEntity = createPostDTO.post;
      await this.postRepository.addPost(post.toObject());
      return AppResult.success({message: "Post created successfully"});
    } catch (err) {
      return AppResult.fail(err.message);
    }
  }

  async fetchAllPosts(fetchAllPostsDTO: FetchAllPostsDTO): Promise<AppResult> {
    try {
      const {paginationOptions} = fetchAllPostsDTO;
      fetchAllPostsDTO.hasAccess();
      const response: PaginatedData<PostEntity> = await this.postRepository.fetchAllPosts(paginationOptions);
      return AppResult.success({data: response.getPaginatedData()});
    } catch (err) {
      return AppResult.fail(err.message);
    }
  }

  async updatePost(updatePostDTO: UpdatePostDTO): Promise<AppResult> {
    try {
      updatePostDTO.hasAccess();
      const post: PostEntity = updatePostDTO.post;
      await this.postRepository.update(post.toObject());
      return AppResult.success({message: "Post updated successfully"});
    } catch (err) {
      return AppResult.fail(err.message);
    }
  }

  async fetchPostById(fetchPostByIdDTO: FetchPostByIdDTO): Promise<AppResult> {
    try {
      const {postId} = fetchPostByIdDTO;
      fetchPostByIdDTO.hasAccess();
      const response: PostEntity = await this.postRepository.fetchById(postId);
      return AppResult.success({data: response});
    } catch (err) {
      return AppResult.fail(err.message);
    }
  }

  async removePost(removePostDTO: RemovePostDTO): Promise<AppResult> {
    try {
      removePostDTO.hasAccess();
      await this.postRepository.remove(removePostDTO.postId);
      return AppResult.success({message: "Post deleted Successfully"})
    } catch (err) {
      return AppResult.fail(err.message);
    }
  }
}

export default PostService


