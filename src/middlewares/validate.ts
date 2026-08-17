import { RequestHandler } from "express";
import { ZodError, ZodSchema } from "zod";

export const validate=(schema:ZodSchema):RequestHandler=>(req, res, next)=>{
    try {
        schema.parse(req.body);
        next()
    } catch (error) {
        if(error instanceof ZodError){
            return res.status(400).json({
                message:"validation error",
                errors: error.issues.map((issue)=>({
                    path:issue.path.join('.'),
                    message:issue.message
                }))
            })
        }
        next(error)
    }
}