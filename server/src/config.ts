import dotenv from 'dotenv';

dotenv.config();

const configKeys = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET as string,
    MONGO_DB_URL: process.env.DATABASE as string,
};

console.log(configKeys.PORT);

export default configKeys;
