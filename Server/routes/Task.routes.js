import express from "express";

import {createTask, getTasks, updateTask, deleteTasks} from "../controllers/task.controller.js"
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router()

router.post("/", verifyToken, createTask)
router.get("/", verifyToken, getTasks)
router.put("/:id", verifyToken, updateTask)
router.delete("/:id", verifyToken, deleteTasks)


export default router
