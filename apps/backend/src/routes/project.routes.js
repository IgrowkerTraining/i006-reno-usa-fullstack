import { Router } from "express";
import { create, getAll, getOne } from "../controllers/projectController.js";

const router = Router();

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getOne);

export default router;