import { useContext } from "react";
import myContext from "../../context/myContext";
import { useNavigate } from "react-router-dom";

const UserDetail = () => {
    const {getAllUser}=useContext(myContext);
    console.log("getAllUser",getAllUser);
    const navigate=useNavigate();
    return (
        <div>
               <div>
            <div className="py-5 flex justify-between items-center">
                {/* text  */}
                <h1 className=" text-xl text-pink-300 font-bold">All User</h1>
            </div>

            {/* table  */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400" >
                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">S.No.</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Name</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Email</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Action</th>
                        </tr>
                        {getAllUser && getAllUser?.map((item,index)=>{
                            const {displayName,email,uid}=item;
                           return( 
                            item?.role==="user" && <tr className="text-pink-300" key={item?.id}>
                           <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                               {index}
                           </td>
                           <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                               {displayName}
                           </td>
                           <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-green-500 cursor-pointer ">
                               {email}
                           </td>
                           <td className="px-4 text-center" ><button className="bg-red-500 p-4 text-white rounded-lg" 
                           onClick={()=>{
                            navigate(`/userproperties/${uid}`)
                           }}>Properties</button></td>
                           </tr>
                           )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
}

export default UserDetail;