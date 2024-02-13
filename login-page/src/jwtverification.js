import jwt from "jsonwebtoken";
const SECRET = "hi there";

export default function jwtVerify(token){
    jwt.verify(token , "hi there" , ( err , result)=>{
        if(err){
            console.log("error");
        }
        else{
            console.log(result);
        }
    })
}