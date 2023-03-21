import * as express from "express";
import PostController from "../../../../Controllers/Api/V1/Post/Post";
import container from "../../../../../App/Infrastructure/IocContainer/container";

const postController = container.resolve(PostController);
const router = express.Router({mergeParams: true});

router.post("/post", postController.createPost);
router.get(`/post/all`, postController.fetchAllPosts);
router.put("/post/:postId", postController.updatePost);
router.get("/post/:postId", postController.fetchPostById);
router.delete("/post/:postId", postController.removePost);

export default router;