import { z } from "zod";

// تعريف الـ enums
const StatusEnum = z.enum(["To-Do", "In-Progress", "Done"]);
const PriorityEnum = z.enum(["Low", "Medium", "High"]);

// Schema للمهمة
export const updateSchema = z.object({
  title: z.string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must not exceed 50 characters"),
  
  description: z.string()
    .trim()
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description must not exceed 500 characters"),
  
  status: StatusEnum,
  priority: PriorityEnum,
  
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// Type مستنتج من الـ schema
export type updateSchemaType = z.infer<typeof updateSchema>;
