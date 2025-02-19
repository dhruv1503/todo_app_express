import { UserController } from "../controllers/user.controller.js";
import {Router} from "express"

const router = Router();
const userController = new UserController()

router.post("/", userController.saveUser.bind(userController));
router.get("/:_id", userController.getUserById.bind(userController));
router.get("/", userController.getUsers.bind(userController));
router.delete("/:_id", userController.deleteUsers.bind(userController));


export default router

