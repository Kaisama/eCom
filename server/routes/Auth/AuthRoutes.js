import express from 'express'
import { authMiddleware, loginUser, logoutUser, registerUser } from '../../controllers/Auth/AuthController.js';

 const authRouter=express.Router();

authRouter.post('/register',registerUser);
authRouter.post('/login',loginUser);
authRouter.post('/logout',logoutUser);
authRouter.get('/check-auth',authMiddleware,(req,res)=>{
    const user=req.user;
    if(user){
        res.status(200).json({
            success:true,
            user,
            message:'User Authenticated'
        })
    }
})

export default authRouter;