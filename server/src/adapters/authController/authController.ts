import asyncHandler from 'express-async-handler';
import {NextFunction, Request,Response} from 'express';
import { UserDbInterface } from '../../application/interfaces/userDbRepository';
import { UserRepositoryMongoDb } from '../../frameworks/databse/repositories/userRepositoryMongoDb';
import { AuthService } from '../../frameworks/services/authService';
import { AuthServiceInterface, authServiceInterface } from '../../application/services/authServiceInterface';
import { UserInterface, createUserInterface } from '../../types/userInterface';
import { userRegister, userLogin, getUserSuggestion, followTheUser, googleAuthRegister } from '../../application/usecases/auth/userAuth';
import AppError from '../../utils/middleware/appError';
import {jwtDecode} from "jwt-decode";
import { JwtPayload } from 'jwt-decode';
import jwt from 'jsonwebtoken'

interface AuthenticatedRequest extends Request { // Rename the interface to avoid naming conflict
  userId?: string;
}

interface DecodedToken extends JwtPayload {
  given_name?: string;
  family_name?: string;
  email?: string
}

const authController = (
    authServiceInterface: AuthServiceInterface,
    authServiceImpl: AuthService,
    userDbRepository: UserDbInterface,
    userDbRepositoryImpl: UserRepositoryMongoDb
) => {

    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());

    const registerUser = asyncHandler(async (req: Request, res: Response) => {
        const user: UserInterface = req.body;
      
        const result = await userRegister(user, dbRepositoryUser, authService);
      
        if (result instanceof AppError) {
          res.json({
            success: false,
            result: {
              error: {
                message: result.message,
                status: result.status,
              },
            },
          });
        } else {
          const { token, createdUser } = result;
      
          res.json({
            success: true,
            message: 'User Registered',
            result: {
              token,
              createdUser,
            },
          });
        }
      });
      
    const loginUser = asyncHandler(async (req: Request, res: Response) => {

      const { email, password }: { email: string; password: string } = req.body;

      const result = await userLogin(email, password, dbRepositoryUser, authService);

        if (result instanceof AppError) {
          res.json({
            status: false,
            result: {
              error: {
                message: result.message,
                status: result.status,
              },
            },
          });
        } else {
          res.json({
            status: true,
            message: "user retrieved",
            result: {
              token: result.token,
              user: result.userDetails,
            },
          });
        }
    });

    const getSuggestion = asyncHandler( async (req: AuthenticatedRequest, res: Response) => {
      const userId = req.userId            

      const suggestions = await getUserSuggestion(dbRepositoryUser, userId);
      
      res.json({
        suggestions: suggestions
      })
    })

    const followUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
      
      const followed = req.params.followed;
      const userId = req.userId  
      let isFollowed;
      
      if(userId){

         isFollowed = await followTheUser(dbRepositoryUser, followed, userId);

      }
        
    
      if (isFollowed) {
        res.json({
          success: true
        });
      }
    });

    const googleAuth = asyncHandler( async (req: Request, res: Response) => {
      console.log("body",req.body);
      
      const tokenObject = JSON.stringify(req.body);
      
      const token = tokenObject
      console.log("toooooookkkkken", token);
      

      const decoded: any = jwtDecode(token);

      console.log("decoded",decoded);
      
      
      const firstName = decoded.given_name;
      const lastName = decoded.family_name;
      const jti = decoded.jti
      const email = decoded.email 

      const result = await googleAuthRegister(firstName, lastName, email, jti, dbRepositoryUser, authService)
      console.log("reeeeeeeesulttttt",result);
      
      if(result){
        res.json(
          result
        )
      }
      
    })


    return {
        registerUser,
        loginUser,
        getSuggestion,
        followUser,
        googleAuth
    }
}

export default authController;