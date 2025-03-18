import { Lab } from '../models/index.js';

// View available labs
export const getAvailableLabs = async (req, res) => {
  try {
    const labs = await Lab.findAll();
    res.status(200).json(labs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};