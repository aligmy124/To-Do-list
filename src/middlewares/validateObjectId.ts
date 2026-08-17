import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
type ItemParams = {
  id: string;
};
const validateObjectId = (
  req: Request<ItemParams>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid item id",
    });
  }

  next();
};

export default validateObjectId