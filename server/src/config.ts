import dotenv from 'dotenv';

dotenv.config();

const configKeys = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET as string,
    MONGO_DB_URL: process.env.DATABASE as string,
    JWT_SECRET_ADMIN: process.env.JWT_SECRET_ADMIN as string,
    MONGO_DB_CLUSTER: process.env.CLUSTER_URL  as string
};

export default configKeys;
