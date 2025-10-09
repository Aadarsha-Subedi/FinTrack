//THIRD PARTY IMPORTS
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

//MIDDLEWARES
import verifyToken from './src/Middlewares/VerifyToken.js';

//ROUTERS
import signupRouter from './src/Routes/SignupRouter.js';
import loginRouter from './src/Routes/LoginRouter.js';
import userRouter from './src/Routes/UserRouter.js';
import userAddRecordRouter from './src/Routes/UserAddRecordRouter.js';
import userDeleteRecordRouter from './src/Routes/UserDeleteRecordRouter.js';
import userUpdateRecordRouter from './src/Routes/UserUpdateRecordRouter.js';
import userAnalyticsRouter from './src/Routes/UserAnalyticsRouter.js';
import logoutRouter from './src/Routes/LogoutRouter.js';
import UserSettingsRouter from './src/Routes/UserSettingsRouter.js';
import verifyRouter from './src/Routes/VerifyRouter.js';

dotenv.config({ path: './.env', quiet: true });
const port = process.env.BACKEND_PORT || 4000;
const app = express();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 100,                   // limit each IP to 100 requests per windowMs
    message: { message: 'Too many requests, please try again later.' },
    standardHeaders: true,      // return rate limit info in headers
    legacyHeaders: false,
});

app.use(limiter);
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());
app.use(signupRouter);
app.use(loginRouter);
app.use(verifyRouter)
app.use('/user', verifyToken, userRouter);
app.use('/user', verifyToken, userAddRecordRouter);
app.use('/user', verifyToken, userDeleteRecordRouter);
app.use('/user', verifyToken, userUpdateRecordRouter);
app.use('/user', verifyToken, userAnalyticsRouter);
app.use('/user', verifyToken, UserSettingsRouter)
app.use('/user', verifyToken, logoutRouter);

app.listen(port);
