import express from 'express';
import router from './Src/modules/auth.router.js';
const app = express();
app.use('/auth',router)
app.listen(3500,()=>{
    console.log(`server listening on 3500`);
})