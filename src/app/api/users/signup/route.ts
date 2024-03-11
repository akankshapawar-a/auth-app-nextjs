import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest ,NextResponse} from "next/server";
import bcrypt from "bcrypt";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request:NextRequest){
   try {
const reqBody=await request.json()
const {username, email,password}= reqBody

console.log(reqBody);

const user=await User.findOne({email})
if(user){
    return NextResponse.json({error:"User already exists"},
        {status:400})
}

//hashpassword
const saltRounds = 10;
const hashedpassword = await bcrypt.hash(password, saltRounds);


const newUser= new User({
   username,
   email,
   password:hashedpassword
})

const savedUser=await newUser.save()
console.log(savedUser);

await sendEmail({email ,emailType:"VERIFY",userId:savedUser._id})

return NextResponse.json({
    message:"User created successfully",
    success:true,
    savedUser
})

// return NextResponse.json({message:"User Created Successfully",
//    success:true,
//    savedUser

//    })
 } catch (error:any) {
    return NextResponse.json({error:error.message},
    {status:500})
   } 
}
