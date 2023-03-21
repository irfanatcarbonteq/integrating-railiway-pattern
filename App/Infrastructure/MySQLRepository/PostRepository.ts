import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import PostEntity from "../../Domain/Post/PostEntity";
import PaginatedData from "../../Domain/Utils/PaginatedData";
import {IPostRepository} from "../../Domain/Post/IPostRepository";
import {injectable} from "tsyringe";

const Post = prisma.post;

@injectable()
class PostRepository implements IPostRepository {

  async addPost(post: PostEntity): Promise<void> {
    await Post.create({
      data: post
    });
  }

  async fetchAllPosts(paginationOptions): Promise<PaginatedData<PostEntity>> {
    const count = await Post.count();
    const postObjs = await Post.findMany({
      skip: paginationOptions.offset(),
      take: paginationOptions.limit(),
    })
    const paginatedData: PaginatedData<PostEntity> = new PaginatedData<PostEntity>(paginationOptions, count)
    postObjs.forEach(postObj => {
      const post = PostEntity.create(postObj);
      paginatedData.addItem(post)
    });
    return paginatedData;
  }

  async fetchById(postId: string): Promise<any> {
    const postObj = await Post.findUnique({
      where: {
        postId: postId,
      },
    })
    if (!postObj) {
      throw new Error("Invalid Post details");
    }
    return PostEntity.create(postObj);
  }

  async update(post: PostEntity): Promise<void> {
    await Post.update({
      where: {
        postId: post.postId,
      },
      data: post    })
  }

  async remove(postId: string): Promise<void> {
    await Post.delete({
      where: {
        postId: postId,
      },
    })
  }

}

export default PostRepository;

