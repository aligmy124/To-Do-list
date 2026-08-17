import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(error.stack); 
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};
