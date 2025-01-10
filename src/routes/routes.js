import { Router } from "express"
import validate_schema from "../middleware/schema_validator.js";
import * as user_controller from "../controller/user.js"
import * as assistant_controller from "../controller/assistant.js";
import * as team_controller from "../controller/team.js";
import * as contract_controller from "../controller/contract.js";
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
import { create_contract_request } from "../request/create_contract_request.js";
import { update_contract_request } from "../request/update_contract_request.js";

const router = Router()
// router.use(active_validator);

router.get("/get-user/:user_id", user_controller.get_user);
router.get("/get-users", user_controller.get_users);
router.get("/get-roles", user_controller.get_roles);
router.get("/get-professions", user_controller.get_professions);
router.post("/create-user", validate_schema(create_user_request), user_controller.create_user);
router.delete("/delete-user/:user_id", user_controller.delete_user);
router.patch("/update-user/:user_id", validate_schema(update_user_request), user_controller.update_user);

router.get("/get-assistants/:user_id", assistant_controller.get_assistants);
router.get("/get-all-assistants", assistant_controller.get_all_assistants);
router.post("/add-assistant", validate_schema(add_assistant_request), assistant_controller.add_assistant);
router.delete("/remove-assistant", validate_schema(remove_assistant_request), assistant_controller.remove_assistant);

router.get("/get-team/:team_name", team_controller.get_team);
router.get("/get-teams", team_controller.get_teams);
router.post("/create-team", validate_schema(create_team_request), team_controller.create_team);
router.patch("/update-team/:team_name", validate_schema(update_team_request), team_controller.update_team);
router.delete("/delete-team/:team_name", team_controller.delete_team);

router.get("/get-members/:team_name", team_controller.get_members);
router.post("/add-member", validate_schema(add_memeber_request), team_controller.add_member);
router.post("/add-members", validate_schema(add_memebers_request), team_controller.add_members);
router.delete("/remove-member", validate_schema(remove_member_request), team_controller.remove_member);

router.post("/create-contract", validate_schema(create_contract_request), contract_controller.create_contract);
router.patch("/update-contract/:contract_id", validate_schema(update_contract_request), contract_controller.update_contract);
router.get("/get-contract/:contract_id", contract_controller.get_contract);
router.get("/get-contracts", contract_controller.get_contracts);
router.get("/get-types", contract_controller.get_types);
router.delete("/delete-contract/:contract_id", validate_schema(update_contract_request), contract_controller.delete_contract);

router.get("/health", health_check);

export default router