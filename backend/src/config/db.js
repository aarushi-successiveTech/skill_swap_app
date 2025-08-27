import mongoose from 'mongoose'; 
const MONGO_URL = "mongodb://localhost:27017/skillSwap";

export const connectDB = async() => {
    try{
        mongoose.connect(MONGO_URL); 
        console.log('db connected');
    }
    catch(error){
        console.log('error connecting to db', error);
    }

}; 