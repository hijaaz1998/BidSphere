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
    })

    const getAllUsers = asyncHandler( async(req: Request, res: Response) => {
        const result = await getUsers(dbRepositoryUser)
        res.json({
            result
        })
    })

    const blockUser = asyncHandler ( async (req: Request, res: Response) => {
        console.log("coming");
        
        const userId: string = req.params.userId;
        const isBlocked = await blockUsers(userId, dbRepositoryUser)

        res.json({
            message: "success"
        })
    })

    const getAuctions = asyncHandler ( async(req: Request, res: Response) => {
        const auctions = await dbRepositoryAuction.getUpcomingAuctions()
        console.log("auctions",auctions);

        res.json({
            auctions
        })
        
    })

    const getPosts = asyncHandler ( async (req: Request, res: Response) => {
        const posts = await dbRepositoryProduct.getAllPostsAdmin()

        res.json({
            posts
        })
    })


    return{
        loginAdmin,
        getAllUsers,
        blockUser,
        getAuctions,
        getPosts,
    }
}

export default adminAuthController