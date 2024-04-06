
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectedRouteForAdmin = ({children}) => {
    const user=useSelector((store)=>store.user);
    // const navigate=useNavigate()

      if(user?.role==="admin"){
        return children;
      }else{
        return <Navigate to={'/signIn'}/>
      }
   
  
}

export default ProtectedRouteForAdmin
