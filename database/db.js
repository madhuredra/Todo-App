import mongoose from 'mongoose';


export const connectDB = () => { mongoose.connect(process.env.MONGODB_URI,
    {dbName : 'backend',})
    .then(() => {
        console.log(`Database connected sucessfully !`);
    })
    .catch((err) => {
        console.log(err);
    })
}
