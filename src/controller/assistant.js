import { pm_log } from "../utils/server.js";
import * as assistant_service from "../service/assistant.js";

export const add_assistant = async (req, res) => {
  try {

    const result = await assistant_service.add_assistant(req.body.assistant_email, req.body.user_email);

    if(!result){
        return res.status(422).json({message: "Invalid data"});
    }

    return res.status(200).json({message: "Assistant added successfully"});

  } catch (error) {
    pm_log(error, true);
    return res.status(500).json(error.message);
  }
};

export const get_assistants = async (req, res) => {
  try {
    const result = await assistant_service.get_assistants(req.params.user_id);

    if (!result) {
      return res.status(422).json({ message: "Not found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    pm_log(error, true);
    return res.status(500).json(error.message);
  }
};

export const remove_assistant = async (req, res) => {
  try {
    const result = await assistant_service.remove_assistant(req.body.assistant_email, req.body.user_email);

    if (!result) {
      return res.status(422).json({ message: "Invalid data" });
    }

    return res.status(200).json({ message: "Assistant removed successfully" });
  } catch (error) {
    pm_log(error, true);
    return res.status(500).json(error.message);
  }
};
