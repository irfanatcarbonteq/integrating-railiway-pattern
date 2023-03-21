import * as express from "express";
import UserController from "../../../../Controllers/Api/V1/User/User";
import container from "../../../../../App/Infrastructure/IocContainer/container";

const userController = container.resolve(UserController);
const router = express.Router({mergeParams: true});

router.post("/user", userController.createUser);
router.get(`/user/all`, userController.fetchAllUsers);
router.put("/user/:userId", userController.updateUser);
router.get("/user/:userId", userController.fetchUserById);
router.delete("/user/:userId", userController.removeUser);

export default router;