import bcrypt from 'bcryptjs';
import User from '../../models/User.js';
import jwt from 'jsonwebtoken'

//register
export const registerUser = async(req,res)=>{
    const {userName,email,password}=req.body;

    try {
        const existingUser = await User.findOne({
            $or: [{ email }, { userName }]
          });
        if(existingUser){
            return res.json({
                success:false,
                message:'User Email or User Name  Exists'
            })
        }

        
        const hashedPassword= await bcrypt.hash(password,12);

        const newUser = new User({
            userName,
            email,
            password : hashedPassword
        })

        await newUser.save();

        res.status(200).json({
            success:true,
            message:'User Created Successfully',
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}


//login

export const loginUser = async(req,res)=>{
    const {email,password}=req.body;

    try {
        const existingUser = await User.findOne({email});
        
        if(!existingUser){
            return res.json({
                success:false,
                message:'User does not exist '
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password,existingUser?.password);

        if(!isPasswordCorrect){
            return res.json({
                success:false,
                message:'Invalid Password!'
            })
        }
        
        const token = jwt.sign({
            id:existingUser._id , 
            role:existingUser.role,
            email:existingUser.email,
        },'CLIENT_SECRET_KEY',{expiresIn : '60m'})
        // console.log('loginUser',token);
        res.cookie('token',token,{httpOnly:true,secure:false}).json({
            success:true,
            message:'Login Successful',
            user:{
                id:existingUser._id,
                email:existingUser.email,
                role:existingUser.role
            }
        })
       
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}



//logout

export const logoutUser=(req,res)=>{
    res.clearCookie('token').json({
        success:true,
        message:'Logout Successful'
    })

} 

//auth middleware

export const authMiddleware = async(req,res,next)=>{
    const token = req.cookies.token;
    // console.log("authMiddleware",token);
    if(!token){
        return res.status(401).json({
            success:false,
            message:'Unauthorized User'
        })
    }

    try {
        const decoded = jwt.verify(token,'CLIENT_SECRET_KEY');
        req.user=decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success:false,
            message:'Unauthorized User'
        })
    }
} 