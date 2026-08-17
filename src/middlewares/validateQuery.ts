import { RequestHandler } from "express";
import { ZodError, ZodSchema } from "zod";
import { TaskQueryForm } from "../Validators/query/taskQuerySchema";

export const validateQuery =
  (schema: ZodSchema<TaskQueryForm>): RequestHandler =>
  (req, res, next) => {
    try {
      const paresedQuery=schema.parse(req.query);
      req.paresedQuery=paresedQuery;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "validation error",
          errors: error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
      }
    }
  };
