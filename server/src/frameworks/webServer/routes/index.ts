import { Application } from "express";
import authRouter from "./auth";

const routes = (app: Application) => {
    app.use('/api/auth', authRouter())
}

export default routes