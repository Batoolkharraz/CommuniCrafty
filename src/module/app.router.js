import authRouter from './auth/auth.router.js';
import userRouter from './user/user.router.js';
import categoryRouter from './category/category.router.js';
import craftRouter from './craft/craft.router.js';
import toolRouter from './tool/tool.router.js';
import { globalErrorHandel } from '../Services/errorHandling.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __dirname=path.dirname(fileURLToPath(import.meta.url));
const fullPath = path.join(__dirname,'../../upload');

const initApp=(app,express)=>{
    app.use(cors());
    //connectDb();
    app.use(express.json());
    app.get('/',(req,res)=>{
        return res.send("welcom to CommuniCrafty!!");
    })
    app.use('/upload',express.static(fullPath));
    app.use('/auth',authRouter);
    app.use('/user',userRouter);
    app.use('/category',categoryRouter);
    app.use('/craft',craftRouter);
    app.use('/tool',toolRouter);
    app.use('*',(req,res)=>{
        return res.json({message:"page not found"});
    })

    app.use(globalErrorHandel);
    
}

export default initApp;