
import { useRecoilValue } from "recoil"
import { userState } from "../store/user"
import About from "./About";
import {BrowserRouter as Router , Routes , Route, useNavigate} from 'react-router-dom'
function Home()
{
  const user = useRecoilValue(userState);
  console.log("in the home and the value of user_type is :" , user.user_type);
  return (
    
    <>
      {user.user_type == "student" ? <Student></Student> : <Teacher></Teacher>}
      
        <Routes>
          <Route path={"/about"} element={<About/>}></Route>
        </Routes>
    </>
  )

}
function Student()
{
return(
  <div> hi there student {localStorage.getItem("user_id")} </div>
)
}
function Teacher(){
  return(
    <div> hi there teacher </div>
  )
}
// function Home(){
//     return ( <div> this is home beta</div> )
// }
export default Home;