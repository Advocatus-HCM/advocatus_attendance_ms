import { pm_log } from "../utils/server.js"
import * as user_service from "../service/user.js";

export const create_user = async (req, res) => {
    try {

        await user_service.create_user(req.body)
        return res.status(200).send("User inserted succesfully")

    } catch (error) {
        pm_log(error, true)
        return res.status(500).json(error.message)
    }
}

export const get_user = async (req, res) => {
  try {

    const user = await user_service.get_user(req.params.user_id);

    if(!user){
      return res.status(404).json({message: "User not found"})
    }

    return res.status(200).json(user);

  } catch (error) {
    pm_log(error, true);
    return res.status(500).json(error.message);
  }
};

export const delete_user = async (req, res) => {
  try {

    const result = await user_service.delete_user(req.params.user_id);

    if(!result){
      return res.status(404).json({ message: "User not found" })
    }

    return res.status(200).json({message: "User deleted successfully"});
    
  } catch (error) {
    pm_log(error, true);
    return res.status(500).json(error.message);
  }
};

export const update_user = async (req, res) => {
  try {
    const result = await user_service.update_user(req.params.user_id, req.body);

    if (!result) {
      return res.status(422).json({ message: "No changes applied" });
    }

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    pm_log(error, true);
    return res.status(500).json(error.message);
  }
};