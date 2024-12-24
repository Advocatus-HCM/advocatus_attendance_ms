import { pm_log } from "../utils/server.js";
import * as team_service from "../service/team.js";

export const create_team = async (req, res) => {
  try {
    await team_service.create_team(req.body);

    return res.status(200).json({ message: "New team created" });
  } catch (error) {
    pm_log(error, true);
    return res.status(500).json(error.message);
  }
};

export const get_team = async (req, res) => {
  try {
    const result = await team_service.get_teams(req.params.team_name);

    if(!result) {
      return res.status(404).json({message: "Team not found"});
    }

    return res.status(200).json(result);
  } catch (error) {
    pm_log(error, true);
    return res.status(500).json(error.message);
  }
};

export const get_teams = async (req, res) => {
  try {
    const result = await team_service.get_teams();

    return res.status(200).json(result);
  } catch (error) {
    pm_log(error, true);
    return res.status(500).json(error.message);
  }
};

export const update_team = async (req, res) => {
  try {

    const result = await team_service.update_team(req.params.team_name, req.body);

    if (!result) {
      return res.status(422).json({ message: "No changes applied" });
    }

    return res.status(200).json({ message: "Team updated" });
  } catch (error) {
    pm_log(error, true);
    return res.status(500).json(error.message);
  }
};

export const delete_team = async (req, res) => {
  try {
    const result = await team_service.delete_team(req.params.team_name);

    if (!result) {
      return res.status(422).json({ message: "No changes applied" });
    }

    return res.status(200).json({ message: "Team deleted" });
  } catch (error) {
    pm_log(error, true);
    return res.status(500).json(error.message);
  }
};