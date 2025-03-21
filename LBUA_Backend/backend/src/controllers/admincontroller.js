import { User, Lab, Request } from '../models/index.js';

// Approve or reject lab requests
export const approveRequest = async (req, res) => {
  try {
    const { requestId, status, remarks } = req.body;
    const request = await Request.findByPk(requestId);

    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.status = status;
    request.remarks = remarks;
    await request.save();

    res.status(200).json({ message: 'Request updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPendingRequests = async (req, res) => {
    try {
      const requests = await Request.findAll({ where: { status: 'Pending' } });
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };