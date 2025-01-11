import { init_contract_model } from "../model/contract.js";
import { init_user_model } from "../model/user.js";
import * as util_service from "../utils/format.js";

export const active_validator = async (req, res, next) => {
  const email = req.headers['user-email']?.trim();

  if (!email) {
    return res.status(401).json({ error: 'User-Email header is missing' });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    const user_model = await init_user_model();
    const contract_model = await init_contract_model();
    
    const user = await user_model.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.active) {
      req.user = user;
      return next();
    }

    const contract = await contract_model.findOne({ user_email: email, is_deleted: false });
    const current_date = util_service.get_current_date();

    if (contract && !(util_service.is_date_greater(contract.start_date, current_date))) {
        await user_model.updateOne({ email: email }, { $set: { active: true } });
    } else {
        return res.status(403).json({ error: 'User does not have an active contract' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};