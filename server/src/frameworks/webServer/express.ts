import express, { Application } from "express";
import morgan from 'morgan';

const expressConfig = (app: Application) => {
  // app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: true }));
};

export default expressConfig;
