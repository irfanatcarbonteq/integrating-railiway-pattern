import {injectable,inject} from "tsyringe";
import container from "../../../../../App/Infrastructure/IocContainer/container";
import PostService from "../../../../../App/Application/Post/PostService";
import CreatePostDTO from "../../../../../App/Application/Post/CreatePostDTO";
import FetchAllPostsDTO from "../../../../../App/Application/Post/FetchAllPostsDTO";
import UpdatePostDTO from "../../../../../App/Application/Post/UpdatePostDTO";
import FetchPostByIdDTO from "../../../../../App/Application/Post/FetchPostByIdDTO";
import RemovePostDTO from "../../../../../App/Application/Post/RemovePostDTO";
import AppResultAdaptor from "../../../../../App/Infrastructure/Utils/AppResultAdaptor";

container.resolve(PostService);

@injectable()
class PostController {

  constructor(@inject("PostService") private postService: PostService) {
  }

  createPost = async (request, response) => {
    const input = new CreatePostDTO(request);
    const appResult = await this.postService.createPost(input);
    AppResultAdaptor.createHTTPResponse(appResult, response);
  }

  fetchAllPosts = async (request, response) => {
    const input = new FetchAllPostsDTO(request);
    const appResult = await this.postService.fetchAllPosts(input);
    AppResultAdaptor.createHTTPResponse(appResult, response);
  }

  updatePost = async (request, response) => {
    const input = new UpdatePostDTO(request);
    const appResult = await this.postService.updatePost(input);
    AppResultAdaptor.createHTTPResponse(appResult, response);
  }

  fetchPostById = async (request, response) => {
    const input = new FetchPostByIdDTO(request);
    const appResult = await this.postService.fetchPostById(input);
    AppResultAdaptor.createHTTPResponse(appResult, response);
  }

  removePost = async (request, response) => {
    const input = new RemovePostDTO(request);
    const appResult = await this.postService.removePost(input);
    AppResultAdaptor.createHTTPResponse(appResult, response);
  }

}

export default PostController