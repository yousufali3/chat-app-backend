import { Router } from "express";
import {
  createGroup,
  joinGroup,
  leaveGroup,
} from "../controllers/groupController.js";
import auth from "../middleware/auth.js";
const router = Router();

router.post("/create", auth, createGroup);
router.post("/:groupId/join", auth, joinGroup);
router.post("/:groupId/leave", auth, leaveGroup);

export default router;
