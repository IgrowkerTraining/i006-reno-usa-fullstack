import {
  createTechnicalApproval,
  getTechnicalApprovals,
  getTechnicalApprovalById,
  updateTechnicalApproval,
  deleteTechnicalApproval,
} from "../services/technicalApproval.service.js";

export const create = async (req, res, next) => {
  try {
    const approval = await createTechnicalApproval({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(approval);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.phaseId) filter.phaseId = req.query.phaseId;
    if (req.query.userId) filter.userId = req.query.userId;
    const approvals = await getTechnicalApprovals(filter);
    res.json(approvals);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const approval = await getTechnicalApprovalById(req.params.id);
    if (!approval) {
      return res.status(404).json({ message: "Technical approval not found" });
    }
    res.json(approval);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const approval = await updateTechnicalApproval(req.params.id, req.body);
    if (!approval) {
      return res.status(404).json({ message: "Technical approval not found" });
    }
    res.json(approval);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const deleted = await deleteTechnicalApproval(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Technical approval not found" });
    }
    res.json({ message: "Technical approval deleted successfully" });
  } catch (error) {
    next(error);
  }
};
