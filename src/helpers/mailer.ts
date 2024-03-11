import nodemailer from 'nodemailer';
import User from '@/models/userModel'
import bcrypt from 'bcrypt'


export const sendEmail=async({email , emailType , userId}:any)=>{
try{
  //create hash token 
const hashedToken=await bcrypt.hash(userId.toString(),10);

// await User.findByIdAndUpte(userId ,{
//   verifyToken:hashedToken , verifyTokenExpiry:Date.now() +3600000},{new:true,
//   runValidators:true})

if(emailType === "VERIFY"){
  await User.findByIdAndUpdate(userId ,{
    verifyToken:hashedToken , verifyTokenExpiry:Date.now() +3600000}
    )
}else if(emailType=== "RESET"){
  await User.findByIdAndUpdate(userId ,{
  forgotPasswordToken:hashedToken ,
   forgotPasswordTokenExpiry:Date.now() +3600000}
   )
}

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f1f05faab8e139",
    pass: "4f17409f5b554c"
  }
});


const mailOptions={
from:'akankshaspawar11@gmail.com',
to:email, 
subject:emailType === "VERIFY" ? "Verify your email":"Reset your password",
html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY"?"verify your email":"reset your password"}
or copy and paste the link below in your browser.<br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
</p>`
}




}catch(error:any){
  throw new Error(error.message);
}
}
