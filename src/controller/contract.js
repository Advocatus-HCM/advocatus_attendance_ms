import * as contract_service from "../service/contract.js"
import { pm_log } from "../utils/server.js";

export const create_contract = async (req, res) => {
  try {
    const result = await contract_service.create_contract(req.body);

    if (!result){
        return res.status(400).json({message: "User has another contract or does not exists"});
    }

    return res.status(200).json(result);
  } catch (error) {
    pm_log(error, true);
    return res.status(500).json(error.message);
  }
};

export const get_contract = async (req, res) => {
  try {
    const result = await contract_service.get_contract(req.params.contract_id);

    if (!result) {
      return res.status(400).json({ message: "Contract not found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    pm_log(error, true);
    return res.status(500).json(error.message);
  }
};

export const get_contracts = async (req, res) => {
  try {
    const result = await contract_service.get_contracts();

    if (!result) {
      return res.status(400).json({ message: "No contracts found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    pm_log(error, true);
    return res.status(500).json(error.message);
  }
};

export const get_types = async (req, res) => {
  try {
    const result = await contract_service.get_types();

    return res.status(200).json(result);
  } catch (error) {
    pm_log(error, true);
    return res.status(500).json(error.message);
  }
};

export const update_contract = async (req, res) => {
  try {
    if(!req.body){
        return res.status(422).json({message: "Body is empty"});
    }

    const result = await contract_service.update_contract(req.body, req.params.contract_id);

    if (!result) {
        return res.status(422).json({message: "No changes applied"});
    }

    return res.status(200).json({ message: "Contract updated" });
  } catch (error) {
    pm_log(error, true);
    return res.status(500).json(error.message);
  }
};

export const delete_contract = async (req, res) => {
  try {
    const result = await contract_service.delete_contract(req.params.contract_id);

    if (!result) {
      return res.status(422).json({ message: "No changes applied" });
    }

    return res.status(200).json({ message: "Contract deleted" });
  } catch (error) {
    pm_log(error, true);
    return res.status(500).json(error.message);
  }
};
