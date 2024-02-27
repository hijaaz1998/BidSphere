import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import { AuthServiceInterface, authServiceInterface } from "../../application/services/authServiceInterface";
import { AuthService } from "../../frameworks/services/authService";
import { adminLogin } from "../../application/usecases/adminAuth/adminAuth";
import { UserDbInterface } from "../../application/interfaces/userDbRepository";
import { UserRepositoryMongoDb, userRepositoryMongoDb } from "../../frameworks/databse/repositories/userRepositoryMongoDb";
import { getUsers } from "../../application/usecases/user/read";
import { blockUsers } from "../../application/usecases/user/read";
import { AuctionDbInterface } from "../../application/interfaces/auctionDbRepository";
import { AuctionRepositoryMongoDb, auctionRepositoryMongoDb } from "../../frameworks/databse/repositories/auctionRepositoryMongoDb";
import { auction } from "../../entities/auction";
import { ProductDbInterface } from "../../application/interfaces/productDbRepository";
import { ProductRepositoryMongoDb, productRepositoryMongoDb } from "../../frameworks/databse/repositories/productRepositoryMongoDb";


const adminAuthController = (
    authServiceInterface: AuthServiceInterface,
    authServiceImpl: AuthService,
    userDbRepository: UserDbInterface,
    userDbRepositoryImpl: UserRepositoryMongoDb,
    auctionDbRepository: AuctionDbInterface,
    auctionDbRepositoryImpl: AuctionRepositoryMongoDb,
    productDbRepository: ProductDbInterface,
    productDbRepositoryImpl: ProductRepositoryMongoDb

) => {

    const authService = authServiceInterface(authServiceImpl());
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl())
    const dbRepositoryAuction = auctionDbRepository(auctionDbRepositoryImpl());
    const dbRepositoryProduct = productDbRepository(productDbRepositoryImpl());

    const loginAdmin = asyncHandler( async (req: Request, res: Response) => {
        try {
            const {email, password} = req.body;
            console.log(email);
            
            const adminToken = await adminLogin(
                email,
                password,
                authService
            );

            res.json({
                status: "success",
                message: "admin logined",
                adminToken
            })
        } catch (error) {
            console.log(error);
            
        }
    })

    const getAllUsers = asyncHandler( async(req: Request, res: Response) => {
        try {
            const result = await getUsers(dbRepositoryUser)
            res.json({
                result
            })
        } catch (error) {
            console.log(error);
            
        }
    })

    const blockUser = asyncHandler ( async (req: Request, res: Response) => {
        try {
        
            const userId: string = req.params.userId;
            const isBlocked = await blockUsers(userId, dbRepositoryUser)

            res.json({
                message: "success"
            })
        } catch (error) {
            console.log(error);
            
        }
    })

    const getAuctions = asyncHandler ( async(req: Request, res: Response) => {
        try {
            const auctions = await dbRepositoryAuction.getUpcomingAuctions()
            console.log("auctions",auctions);

            res.json({
                auctions
            })
        } catch (error) {
            console.log(error);
            
        }
        
    })

    const getPosts = asyncHandler ( async (req: Request, res: Response) => {
        try {
            const posts = await dbRepositoryProduct.getAllPostsAdmin()

            res.json({
                posts
            })
        } catch (error) {
            console.log(error);
            
        }
    })

    const blockAuction = asyncHandler ( async (req: Request, res: Response) => {
        try {
            const auctionId = req.params.id
            const blocked = await dbRepositoryAuction.auctionBlock(auctionId)

            res.json({
                blocked
            })
        } catch (error) {
            console.log(error);
            
        }
    })

    const getReports = asyncHandler ( async (req: Request, res: Response) => {
        try {
            const reports = await dbRepositoryProduct.fetchReports()
        } catch (error) {
            console.log(error);
            
        }
    })

    return{
        loginAdmin,
        getAllUsers,
        blockUser,
        getAuctions,
        getPosts,
        blockAuction,
        getReports
    }
}

export default adminAuthController