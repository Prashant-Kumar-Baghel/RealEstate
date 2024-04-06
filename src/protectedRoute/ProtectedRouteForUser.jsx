import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom';
import { Navigate } from "react-router"
const ProtectedRouteForUser = ({children}) => {
    const user=useSelector((store)=>store.user);
    console.log('console',user)
    // const navigate=useNavigate()

      if(user?.role==="user"){
        return children;
      }else{
        return <Navigate to={'/signIn'}/>
      }
   
  
}

export default ProtectedRouteForUser
