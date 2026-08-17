import { z } from "zod";
const StatusEnum = z.enum(["To-Do", "In-Progress", "Done"]);
const PriorityEnum = z.enum(["Low", "Medium", "High"]);

export const PartialEditTaskSchema = z
  .object({
    status: StatusEnum.optional(),
    priority: PriorityEnum.optional(),
  })
  .strict()
  .refine((data) => data.status !== undefined || data.priority !== undefined, {
    message: "At least one field must be provided for update",
  });
