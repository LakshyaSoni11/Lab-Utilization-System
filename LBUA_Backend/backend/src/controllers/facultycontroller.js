import { Request, Lab } from '../models/index.js';

// Create a lab utilization request
export const createLabRequest = async (req, res) => {
  try {
    const { labId, reason } = req.body;
    const request = await Request.create({
      userId: req.user.id,
      labId,
      reason,
      status: 'Pending',
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View faculty's own requests
export const getFacultyRequests = async (req, res) => {
  try {
    const requests = await Request.findAll({ where: { userId: req.user.id } });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};