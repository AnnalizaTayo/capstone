import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { userRouter } from './routes/users.js'

dotenv.config();

const app = express();
//create a new instance for our server application.

app.use(express.json());
//parse incoming request body as JSON

app.use(cors());
//allow cross origin requests (CORS) - allow other websites access this api endpoint

app.use("/auth", userRouter);

mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGODB_USERDB_PASSWORD}@houseofj.puagkxr.mongodb.net/users?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});