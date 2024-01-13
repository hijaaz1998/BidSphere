import { Application } from "express";
import authRouter from "./authRoute";
import productRouter from "./productRoute";

const routes = (app: Application) => {
    app.use('/api/product', productRouter())
    app.use('/api/auth', authRouter())
    app.use('/api/admin', )
}

export default routes