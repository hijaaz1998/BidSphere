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
import nodemailer from 'nodemailer'


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
            res.json({reports})
        } catch (error) {
            console.log(error);
            
        }
    })

    const getIncome = asyncHandler ( async (req: Request, res: Response) => {
        try {
            const incomes = await dbRepositoryAuction.getIncomes()
            res.json({incomes})
        } catch (error) {
            console.log(error)
        }
    })

    const approveAuction = asyncHandler ( async (req: Request, res: Response) => {
        try {
            const paymentId = req.params.paymentId
            const approved = await dbRepositoryAuction.auctionApprove(paymentId)

            const payerEmail = approved?.payerEmail as string;
            const auctionerEmail = approved?.auctionerEmail as string
            const updated = approved?.updated
            
            if (approved) {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    port: 587,
                    auth: {
                        user: 'muhammadijasbtc@gmail.com',
                        pass: 'lcui urmh witl gaah'
                    }
                });
        
                // Send email to the payer
                const payerMailOptions = {
                    from: 'test@wristcrafts.com',
                    to: payerEmail,
                    subject: "Auction Success",
                    text: `Your auction has been successful and approved. Now you can contact with the auctioner using the email: ${auctionerEmail}`
                };
        
                // Send email to the auctioner
                const auctionerMailOptions = {
                    from: 'test@wristcrafts.com',
                    to: auctionerEmail,
                    subject: "Auction Success",
                    text: `Your auction has been successful and approved. Now you can chat with the final bidder using the email: ${payerEmail}`
                };
        
                // Send email to the payer
                transporter.sendMail(payerMailOptions, (error) => {
                    if (error) {
                        console.log("Error sending email to payer:", error);
                    } else {
                        console.log('Email sent to payer:', approved.payerEmail);
                    }
                });
        
                // Send email to the auctioner
                transporter.sendMail(auctionerMailOptions, (error) => {
                    if (error) {
                        console.log("Error sending email to auctioner:", error);
                    } else {
                        console.log('Email sent to auctioner:', approved.auctionerEmail);
                    }
                });
        
                res.json({
                    message: 'Email have been sent',
                    updated
                });
            }
        } catch (error) {
            console.log(error)
        }
        
    })

    const dashboard = asyncHandler( async (req: Request, res: Response) => {
        const payments = await dbRepositoryAuction.getPayments()
        res.json({payments})
    })

    return{
        loginAdmin,
        getAllUsers,
        blockUser,
        getAuctions,
        getPosts,
        blockAuction,
        getReports,
        getIncome,
        approveAuction,
        dashboard
    }
}

export default adminAuthController