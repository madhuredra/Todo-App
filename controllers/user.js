import {User} from '../models/user.js';
import * as bcrypt from 'bcrypt';
import {sendCookie} from '../utils/features.js';

// register route
export const register = async (req,res) => {
    let {name,email,password} = req.body;
    let user = await User.findOne({email})
    if (user!==null) {
        return res.status(404).json({
            success : false,
            message : 'User already exist'
        })
    }
    const hashedPassword = bcrypt.hash(password, 10 , function(err,hash) {
        if(err) {
            return err;
        } 

        password = hashedPassword;
    });        
    
    user = await User.create({
        name,
        email,
        password,
    });

    sendCookie(user, res, `User Registered Successfully !`, 201);
}

// login routesn 
export const login = async (req,res ,next)  => {  
    const {email,password} = req.body;
    const user = await User.findOne({email});
    console.log(user);
    if (!user) {
        return res.status(404).json({
            sucess : false,
            message : 'Invalid Email or Password'
        });

    } 
    const isMatch = bcrypt.compare(
        password,
        user.password 
    );
    if (!isMatch) {
        return res.status(404).json({
            sucess: false,
            message: "Invalid Password",
        });
    } 
    sendCookie(user, res, `Welcome Back , ${user.name}`, 200);

}

//getAllUser Routes


// getOneUser Routes
export const getUserDetails = async (req,res) => {
    console.log(req.user);
    return res.status(200).json({
        success : true,
        user : req.user
    })
}

// logout

export const logout = async (req,res) => {
    return res
      .status(200)
      .cookie("token", null, {
        expiresIn: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "development" ? false : true,
      })
      .json({
        success: true,
        message: "Logged out successfully !",
      });    
}