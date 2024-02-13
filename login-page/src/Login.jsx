import { useState } from "react";
import { userState } from "../store/user";
import {RecoilRoot , atom , useRecoilState , useSetRecoilState,useRecoilValue} from "recoil";
import axios from 'axios'
function Login({setLoggedIn}){
    const [username , setUsername] = useState(0);
    const [password , setPassword] = useState('');
    const reqToBesent = {
        username : username , 
        password : password
    }
    const setLogin = useSetRecoilState(userState)
    return ( 
    
    <div>
        Enter the username<input type="number" onChange={(e)=>{
            setUsername(e.target.value);
        }}/>
        Enter the password <input type="text"  onChange={(e)=>{
            setPassword(e.target.value);
        }}/>    
        <button onClick={()=>{
            async function getResponse(){
                fetch("http://localhost:3000/user/login" , 
                { 
                    method : "POST" , 
                    headers : {
                    'Content-type' : "Application/json" ,
                    }, 
                    body: JSON.stringify(
                        {
                            username : username , password : password
                        })
                }).then((response)=>{
                    response.json().then((data)=>{
                        console.log("in the response .json.then");
                        console.log(data);
                        if(data.user_type){
                            console.log(data.user_type)
                            // localStorage.setItem("loggedIn",true);
                            localStorage.setItem("user_id" , data.user_id);
                            localStorage.setItem("user_type",data.user_type);
                            console.log("setLoggedIn to true here")
                            const object = {user_id : data.user_id , user_type : data.user_type, loggedIn : true};
                            localStorage.setItem("token" , data.token);
                            setLogin(object);
                        }else{
                            alert("wrong credentials");
                            const object = {user_id : 0 , user_type : '', loggedIn : false};
                            setLogin(object);
                        }
                    })
                })
            } 

            getResponse();
        }}>Submit</button>

    </div> )
}
export default Login;