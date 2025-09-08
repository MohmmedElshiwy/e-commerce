
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions:NextAuthOptions = {
    pages:{
        signIn:"/login"
    },

  providers:[
    Credentials({
        name:"Credentials",
        credentials:{
            email:{},
            password:{}
    }, 
    authorize: async(credentials)=>{
      const response=await  fetch(`${process.env.API}/auth/signin`,{
            method:"POST",
            body:JSON.stringify({
                email:credentials?.email,
                password:credentials?.password
            }),
            headers:{
                "Content-Type":"application/json"
            }
        })
        
        const paylod=await response.json();
        const tokenId= JSON.parse(Buffer.from(paylod.token.split('.')[1],'base64').toString())
    //    console.log("decoded",tokenId);
       
        if(paylod.message==="success"){
            return {
                id:tokenId.id,
                user:paylod.user,
                token:paylod.token
            }
        }else{
            throw new Error(paylod.message || "Something went wrong!")
        }
        // return null
    }
    
})
  ] , 
  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.user = user ?.user;
      token.token = user?.token ;
    }
    return token
  },
  async session({ session, token}) {

    session.user = token.user
    return session
  }
}
}