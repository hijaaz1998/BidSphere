import { ReadPosition } from "fs";
import User from "../../frameworks/databse/model/userModel";
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";

interface AuthenticatedRequest extends Request { // Rename the interface to avoid naming conflict
    userId?: string;
}



const checkBlocked = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const id = req.userId;
    
    const user = await User.findById(id)

    const isBlocked = user?.isBlocked    

    if(isBlocked){        
       return res.json({
        blocked: true
       }) 
    } else {
        next();
    }

}

export default checkBlocked