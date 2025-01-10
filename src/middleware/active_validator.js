import { init_user_model } from "../model/user";

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

    const contract = await contract_model.findOne({ user_email: email });
    if (!contract || new Date(contract.start_date) > new Date()) {
      await user_model.updateOne({ email: email }, { $set: { active: false } });
    } else {
      await user_model.updateOne({ email: email }, { $set: { active: true } });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};
