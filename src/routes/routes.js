import { Router } from "express"
import validate from "../request/validator.js";
import * as user_controller from "../controller/user.js"
import * as assistant_controller from "../controller/assistant.js";
import * as team_controller from "../controller/team.js";
import { health_check } from "../controller/server.js";
import { create_user_request } from "../request/create_user_request.js";
import { update_user_request } from "../request/update_user_request.js";
import { add_assistant_request } from "../request/add_assistant_request.js";
import { remove_assistant_request } from "../request/remove_assistant_request.js";
import { create_team_request } from "../request/create_team_request.js";
import { update_team_request } from "../request/update_team_request.js";
import { add_memeber_request } from "../request/add_memeber_request.js";
import { add_memebers_request } from "../request/add_memebers_request.js";
import { remove_member_request } from "../request/remove_member_request.js";

const router = Router()

router.get("/get-user/:user_id", user_controller.get_user);
router.get("/get-users", user_controller.get_users);
router.get("/get-roles", user_controller.get_roles);
router.get("/get-professions", user_controller.get_professions);
router.post("/create-user", validate(create_user_request), user_controller.create_user);
router.delete("/delete-user/:user_id", user_controller.delete_user);
router.patch("/update-user/:user_id", validate(update_user_request), user_controller.update_user);

router.get("/get-assistants/:user_id", assistant_controller.get_assistants);
router.post("/add-assistant", validate(add_assistant_request), assistant_controller.add_assistant);
router.delete("/remove-assistant", validate(remove_assistant_request), assistant_controller.remove_assistant);

router.get("/get-team/:team_name", team_controller.get_team);
router.get("/get-teams", team_controller.get_teams);
router.post("/create-team", validate(create_team_request), team_controller.create_team);
router.patch("/update-team/:team_name", validate(update_team_request), team_controller.update_team);
router.delete("/delete-team/:team_name", team_controller.delete_team);

router.get("/get-members/:team_name", team_controller.get_members);
router.post("/add-member", validate(add_memeber_request), team_controller.add_member);
router.post("/add-members", validate(add_memebers_request), team_controller.add_members);
router.delete("/remove-member", validate(remove_member_request), team_controller.remove_member);

// router.delete("/get-contract", validate(user_request), get_contract);
// router.get("/add-contract", validate(user_request), add_contract);
// router.post("/delete-contract", validate(user_request), delete_contract);
// router.patch("/update-contract", validate(user_request), update_contract);

router.get("/health", health_check);

export default router