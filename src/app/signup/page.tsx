"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function SignupPage(){
const router=useRouter();
    const [user , setUser]=useState({
        email:"",
        password:"",
        username:"",
    })
    const[buttonDisable , setButtonDisable ]=React.useState(false)
const [loading , setLoading]=React.useState(false);
    const onSignup= async()=>{
     try {
       setLoading(true);
     const response= await axios.post("/api/users/signup",user);
     console.log(response.data);
     router.push('/login');
     } catch (error:any) {
       toast.error("signup failed",error.message) 
     }
     finally{
        setLoading(false);
     }
    }

 useEffect(()=>{
if(user.email.length>0 && user.password.length>0 && user.username.length>0){
    setButtonDisable(false);
}
else{
    setButtonDisable(true);
}
 },[user])

    return(
       <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="py-3">
           {loading ? "Signup" :"Processing..."}
        </h1>
        <hr/>
        <label htmlFor="username">Username</label>
        <input
        className="p-2 border border-gray-300  rounded-lg
        mb-4 focus:outline-none focus:border-gray-600"
         id="username"
        type="text"
        value={user.username}
        onChange={(e)=>setUser({...user ,username:e.target.value})}
        placeholder="username"/>


<label htmlFor="email">Email</label>
<input
className="p-2 border border-gray-300  rounded-lg
mb-4 focus:outline-none focus:border-gray-600"
 id="email"
type="text"
value={user.email}
onChange={(e)=>setUser({...user ,email:e.target.value})}
placeholder="email"/> 

<label htmlFor="password">Password</label>
<input
className="p-2 border border-gray-300  rounded-lg
mb-4 focus:outline-none focus:border-gray-600"
 id="password"
type="password"
value={user.password}
onChange={(e)=>setUser({...user ,password:e.target.value})}
placeholder="password"/> 

<button
className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
onClick={onSignup}>
{buttonDisable ?"No signup" :"Signup"}
</button>
<Link href="/login">Visit login</Link>
       </div>




    )
}