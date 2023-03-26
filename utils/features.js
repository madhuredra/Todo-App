import jwt from 'jsonwebtoken';
export const sendCookie = async (user,res,message,statusCode=200) => {
    const usertoken = await jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        {expiresIn : '1h'}
    );

    return res
      .status(statusCode)
      .cookie("token", usertoken, {
        httpOnly: true,
        expiresIn: new Date(Date.now() + 10 * 60 * 1000),
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "development" ? false : true,
      })
      .json({
        success: true,
        message: `${message}`,
      });    
}