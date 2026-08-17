import express from "express";
import {
  createTask,
  deleteTask,
  editPartialy,
  editTask,
  showTasks,
  singleTask,
} from "../controllers/tasksController";
import { validate } from "../middlewares/validate";
import { TaskSchema } from "../Validators/body/task.schema";
import validateObjectId from "../middlewares/validateObjectId";
import { updateSchema } from "../Validators/body/update.schema";
import { PartialEditTaskSchema } from "../Validators/body/partialEdit.schema";
import { validateQuery } from "../middlewares/validateQuery";
import { taskQuerySchema } from "../Validators/query/taskQuerySchema";

const router = express.Router();

// create task
router.post("/", validate(TaskSchema), createTask);
router.get("/", validateQuery(taskQuerySchema) ,showTasks);
router.get("/:id", validateObjectId, singleTask);
router.put("/:id", validate(updateSchema), validateObjectId, editTask);
router.patch(
  "/:id",
  validate(PartialEditTaskSchema),
  validateObjectId,
  editPartialy,
);
router.delete("/:id", validateObjectId, deleteTask);

export default router;
