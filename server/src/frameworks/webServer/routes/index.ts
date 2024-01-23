import { Application } from "express";
import authRouter from "./authRoute";
import productRouter from "./productRoute";
import adminRouter from "./adminRoute";

const routes = (app: Application) => {
    app.use('/api/product', productRouter())
    app.use('/api/user', authRouter())
    app.use('/api/admin', adminRouter())
}

export default routes