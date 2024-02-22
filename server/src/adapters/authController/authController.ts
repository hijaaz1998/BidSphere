import asyncHandler from 'express-async-handler';
import {NextFunction, Request,Response} from 'express';
import { UserDbInterface } from '../../application/interfaces/userDbRepository';
import { UserRepositoryMongoDb } from '../../frameworks/databse/repositories/userRepositoryMongoDb';
import { AuthService } from '../../frameworks/services/authService';
import { AuthServiceInterface, authServiceInterface } from '../../application/services/authServiceInterface';
import { UserInterface, createUserInterface } from '../../types/userInterface';
import { userRegister, userLogin, getUserSuggestion, followTheUser, getFollowersList, googleAuthRegister, unfollowTheUser, checkEmail, changeThePassword, getFollowingList, getUserInfo, userSearch, getFavorites } from '../../application/usecases/auth/userAuth';
import AppError from '../../utils/middleware/appError';
import {jwtDecode} from "jwt-decode";
import { JwtPayload } from 'jwt-decode';
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';
import { Z_ASCII } from 'zlib';

let otp: Number;
let RegisterOtp: Number

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

     const getOtpForRegister = asyncHandler ( async (req: Request, res: Response) => {

        RegisterOtp = generateOtp();

        const emailObject = req.body;
      
        const email = Object.keys(emailObject)[0];

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 587,
          auth: {
            user: 'muhammadijasbtc@gmail.com',
            pass: 'lcui urmh witl gaah'
          }
        });

        const mailOptions = {
          from: 'test@wristcrafts.com',
          to: email,
          subject: "Your OTP",
          text: `Your OTP is ${RegisterOtp}`
        }


        transporter.sendMail(mailOptions, (error) => {
          if (error) {
              console.log(error);
          } else {
              console.log('Email sent:');
              console.log(RegisterOtp);
              
              res.json({
                success: true,
                otp: RegisterOtp,
                message: "Otp has been sent"
              })
          }
        });

     })

     const getOtp = asyncHandler(async (req: Request, res: Response) => {

      const emailObject = req.body;
      
      const email = Object.keys(emailObject)[0];
      
      otp = generateOtp();

      const checkData = await checkEmail(dbRepositoryUser, email)

      if(!checkData) {
        res.json({
          success: false,
          message: "Please check the mail you entered"
        })
      } else {
        console.log(otp);
        
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 587,
          auth: {
            user: 'muhammadijasbtc@gmail.com',
            pass: 'lcui urmh witl gaah'
          }
        });

        const mailOptions = {
          from: 'test@wristcrafts.com',
          to: email,
          subject: "Your OTP",
          text: `Your OTP is ${otp}`
        }


        transporter.sendMail(mailOptions, (error) => {
          if (error) {
              console.log(error);
          } else {
              console.log('Email sent:');
              console.log(otp);
              
              res.json({
                success: true,
                otp: otp,
                message: "Otp has been sent"
              })
          }
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

    function generateOtp() {
      return Math.floor(1000 + Math.random() * 9000);
    }

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
          isFollowed
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

    const unfollow = asyncHandler ( async (req: AuthenticatedRequest, res: Response) => {
      const logedInUser = req.userId;
      const unfollowedId = req.params.unfollowedId;
      console.log("unfollowing");
      

      const isUnfollowed = await unfollowTheUser(dbRepositoryUser ,logedInUser, unfollowedId)

      if(isUnfollowed){
        res.json({
          isUnfollowed
        })
      }
    })

    const changePassword = asyncHandler ( async (req: Request, res: Response) =>  {
      const {email, password} = req.body;

      const response = await changeThePassword(dbRepositoryUser, authService, email, password)

      res.json({
        response
      })
    })

    const getFollowing = asyncHandler ( async (req: Request, res: Response) => {
      
      const userId = req.params.userId;

      const following = await getFollowingList(dbRepositoryUser, userId)

      res.json({
        following
      })
    })

    const getFollowers = asyncHandler ( async (req: Request, res: Response) => {

      const userId = req.params.userId;

      const followers = await getFollowersList(dbRepositoryUser, userId)

      res.json({
        followers
      })
    })

    const getUserInfos = asyncHandler ( async (req: Request, res: Response) => {
      const userId = req.params.userId
      const user = await getUserInfo(dbRepositoryUser, userId )

      res.json({
        user
      })
    })

    const searchUser = asyncHandler (async (req: AuthenticatedRequest, res: Response) => {
      const userId = req.userId;
      const search: any = req.query.search

      const results = await userSearch(dbRepositoryUser, userId, search)

      res.json({
        results
      })
    })

    const getFavorite = asyncHandler ( async (req: Request, res: Response) => {
      const userid = req.params.userId;
      const favorites = await getFavorites(dbRepositoryUser, userid)

      res.json({
        favorites
      })
    })

    return {
        registerUser,
        loginUser,
        getSuggestion,
        followUser,
        googleAuth,
        unfollow,
        getOtp,
        changePassword,
        getFollowing,
        getFollowers,
        getUserInfos,
        getOtpForRegister,
        searchUser,
        getFavorite
    }
}

export default authController;