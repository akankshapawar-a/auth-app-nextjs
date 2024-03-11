import mongoose from 'mongoose';


export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!); //url always resolve or avalible for all time 
        const connection=mongoose.connection;

        //for listening
        connection.on('connected',()=>{
            console.log('MongoDB connected Sucessfully');
        })

        connection.on('error',(err)=>{
            console.log('MongoDB connection error '+err);
            process.exit();
        })
    } catch (error) {
        console.log("Something goes wrong!");
        console.log(error);
    }
}