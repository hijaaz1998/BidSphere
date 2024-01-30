// authMiddleware.ts

import configKeys from '../../config';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedToken {
  userId: string; // Update the type of userId as per your requirement
}

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): any => {
  const token: string | undefined =
    req.headers.authorization && req.headers.authorization.split(' ')[1];

    console.log("tokken",token);
    

  if (token) {
    try {
      console.log("configKeys.JWT_SECRET",configKeys.JWT_SECRET);
      
      const decodedToken = jwt.verify(token, configKeys.JWT_SECRET) as JwtPayload;
      console.log("req",decodedToken);

      const payloadObject = JSON.parse(decodedToken.payload);
      console.log("payload", payloadObject);
            
      req.userId = payloadObject;  
      console.log("going");
                 
      
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }
};

export  default verifyToken;