import { z } from "zod";

const StatusEnum = z.enum(["To-Do", "In-Progress", "Done"]);
const PriorityEnum = z.enum(["Low", "Medium", "High"]);
const SortEnum = z.enum([
  "createdAt",
  "updatedAt",
  "title",
  "priority",
  "status",
]);
const OrderEnum = z.enum(["asc", "desc"]);
export const taskQuerySchema = z.object({
  status: StatusEnum.optional(),
  priority: PriorityEnum.optional(),
  search:z.string().trim().min(1).optional(),
  page:z.coerce.number().default(1),
  limit:z.coerce.number().default(10),
  sort: SortEnum.default("createdAt"),
  order:OrderEnum.default("desc")
}).strict();

export type TaskQueryForm = z.infer<typeof taskQuerySchema>;

