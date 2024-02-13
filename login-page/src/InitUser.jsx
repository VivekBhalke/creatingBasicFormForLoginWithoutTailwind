import { useRecoilValue, useSetRecoilState } from "recoil"
import { userState } from "../store/user"
import Login from "./Login";
import Home from "./Home"
import { useEffect , useState } from "react";
function InitUser(){
    const user = useRecoilValue(userState);
    // const [logIn , setLoginUseState] = useState(false)
    const setLogin  = useSetRecoilState(userState);
    useEffect(()=>{
        console.log("useEffect ran");
        fetch("http://localhost:3000/user/me" , 
        {
            method: "GET" , 
            headers : {
                "Content-type" : "Application/json",
                "token" : localStorage.getItem("token")
            }
        }).then((response)=>{
            response.json().then((data)=>{
                if(data.user_type){
                    //correct token user is logged in 
                    localStorage.setItem("user_id" , data.user_id);
                    localStorage.setItem("user_type",data.user_type);
                    const object = {user_id : data.user_id , user_type : data.user_type, loggedIn : true};
                    localStorage.setItem("token" , data.token);
                    setLogin(object);
                    // setLoginUseState(true);
                }else{
                    const object = {user_id : 0 , user_type : "", loggedIn : false};
                    setLogin(object);
                    // setLoginUseState(false);
                }
            })
        })
    } , [])
    return (
        <div> { !user.loggedIn ?  <Login ></Login>: <Home></Home> }</div>
    )
}
export default InitUser;