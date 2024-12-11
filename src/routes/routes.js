import { Router } from "express"
import { create_user } from "../controller/user.js"
import { health_check } from "../controller/server.js";

const router = Router()

router.post("/create-user", create_user);
router.get("/health", health_check);

export default router