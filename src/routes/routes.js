import { Router } from "express"
import validate from "../request/validator.js";
import * as user_controller from "../controller/user.js"
import * as assistant_controller from "../controller/assistant.js";
import { health_check } from "../controller/server.js";
import { create_user_request } from "../request/create_user_request.js";
import { update_user_request } from "../request/update_user_request.js";
import { add_assistant_request } from "../request/add_assistant_request.js";

const router = Router()

router.get("/get-user/:user_id", user_controller.get_user);
router.post("/create-user", validate(create_user_request), user_controller.create_user);
router.delete("/delete-user/:user_id", user_controller.delete_user);
router.patch("/update-user/:user_id", validate(update_user_request), user_controller.update_user);

router.get("/get-assistants/:user_id", assistant_controller.get_assistants);
router.post("/add-assistant", validate(add_assistant_request), assistant_controller.add_assistant);
// router.delete("/remove-assistant", validate(user_request), remove_assistant);

// router.get("/get-members", validate(user_request), get_member);
// router.post("/add-member", validate(user_request), add_member);
// router.delete("/remove-member", validate(user_request), remove_member);

// router.get("/get-team", validate(user_request), get_team);
// router.post("/add-team", validate(user_request), add_team);
// router.patch("/update-team", validate(user_request), update_team);
// router.delete("/remove-team", validate(user_request), remove_team);

// router.delete("/get-contract", validate(user_request), get_contract);
// router.get("/add-contract", validate(user_request), add_contract);
// router.post("/delete-contract", validate(user_request), delete_contract);
// router.patch("/update-contract", validate(user_request), update_contract);

router.get("/health", health_check);

export default router