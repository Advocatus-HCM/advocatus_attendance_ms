import { Router } from "express"
import { create_user } from "../controller/user.js"
import { health_check } from "../controller/server.js";
import { user_request } from "../request/user_request.js";
import validate from "../request/validator.js";

const router = Router()

router.post("/create-user", validate(user_request), create_user);
router.get("/health", health_check);

export default router