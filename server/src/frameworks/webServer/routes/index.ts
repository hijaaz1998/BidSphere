import { Application } from "express";
import authRouter from "./authRoute";
import productRouter from "./productRoute";
import adminRouter from "./adminRoute";
import auctionRouter from "./auctionRoute";
import chatRouter from "./chatRoute";

const routes = (app: Application) => {
    app.use('/api/product', productRouter())
    app.use('/api/user', authRouter())
    app.use('/api/admin', adminRouter())
    app.use('/api/auction', auctionRouter())
    app.use('/api/messages', chatRouter())
}

export default routes