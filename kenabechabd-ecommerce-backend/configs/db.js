import mongoose from "mongoose";

const connetDB=async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected");
        });
        await mongoose.connect(`${process.env.MONGODB_URI}/KenaBechaBD`);
    } catch (error) {
        console.log(error.message);
    }
}

export default connetDB;