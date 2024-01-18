import asyncHandler from 'express-async-handler';
import {NextFunction, Request,Response} from 'express';
import { UserDbInterface } from '../../application/interfaces/userDbRepository';
import { UserRepositoryMongoDb } from '../../frameworks/databse/repositories/userRepositoryMongoDb';
import { AuthService } from '../../frameworks/services/authService';
import { AuthServiceInterface, authServiceInterface } from '../../application/services/authServiceInterface';
import { UserInterface, createUserInterface } from '../../types/userInterface';

import { userRegister, userLogin, getUserSuggestion, followTheUser } from '../../application/usecases/auth/userAuth';
import AppError from '../../utils/middleware/appError';

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
              user: result.user,
            },
          });
        }
    });

    const getSuggestion = asyncHandler( async (req: Request, res: Response) => {
      const userId = req.params.userId

      const suggestions = await getUserSuggestion(dbRepositoryUser, userId);
      
      res.json({
        suggestions: suggestions
      })
    })

    const followUser = asyncHandler (async (req: Request, res: Response) => {
      const {followed, followedBy} = req.body;

      const isFollowed = await followTheUser(dbRepositoryUser, followed, followedBy)

      if(isFollowed){
        res.json({
          success: true
        })
      }
    })


    return {
        registerUser,
        loginUser,
        getSuggestion,
        followUser
    }
}

export default authController;