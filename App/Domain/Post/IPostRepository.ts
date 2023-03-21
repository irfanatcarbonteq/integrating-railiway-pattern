import PostEntity from "./PostEntity";
import PaginationData from "../../../Infrastructure/Utils/PaginationData";
import PaginationOptions from "../../../Infrastructure/Utils/PaginationOptions";

export interface IPostRepository {
  addPost(post: PostEntity): Promise<void>;

  fetchById(postId: string): Promise<PostEntity>;

  fetchAllPosts(options: PaginationOptions): Promise<PaginationData<PostEntity>>;

  update(post: PostEntity): Promise<void>;

  remove(postId: string): Promise<void>;
}