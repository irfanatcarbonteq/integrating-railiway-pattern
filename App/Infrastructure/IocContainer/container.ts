import {container} from "tsyringe";
//interface
import {IPostRepository} from "../../Domain/Post/IPostRepository";
import {IUserRepository} from "../../Domain/User/IUserRepository";
//component
import PostRepository from "../MySQLRepository/PostRepository";
import UserRepository from "../MySQLRepository/UserRepository";
//utilizer
import PostService from "../../Application/Post/PostService";
import UserService from "../../Application/User/UserService";

//i-binding
container.registerSingleton<IPostRepository>('PostRepository', PostRepository);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
//s-binding
container.registerSingleton<PostService>('PostService', PostService);
container.registerSingleton<UserService>('UserService', UserService);

export default container;