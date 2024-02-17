import { ReadPosition } from "fs";
import User from "../../frameworks/databse/model/userModel";
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";

interface AuthenticatedRequest extends Request { // Rename the interface to avoid naming conflict
    userId?: string;
}



const checkBlocked = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const id = req.userId;
    console.log("id",id);
    
    const user = await User.findById(id)

    const isBlocked = user?.isBlocked
    console.log("blocked",isBlocked);
    

    if(isBlocked){
        console.log("it is blocked");
        
       return res.json({
        blocked: true
       }) 
    } else {
        next();
    }

}

export default checkBlocked