import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import errorMiddleware from "./middlwares/errror-handling/error-handling";
import routers from "./routers";

dotenv.config();

const app: Application = express();

app.use(cors());

app.use(express.json());

app.use('/', routers);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URI || '');
		app.listen(Number(PORT) || 3000, () => {
			console.log('Server started on port ', PORT || 3000);
		});
	} catch (e) {
		console.log(e);
	}
};

start();