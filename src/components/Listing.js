import React, { useEffect, useState } from 'react'
import { db } from '../utils/firebase'
import { collection, onSnapshot } from 'firebase/firestore';
import ItemCard from "../components/ItemCard"
import Spinner from '../components/Spinner';
import { Grid, GridColumn, GridRow } from 'semantic-ui-react';
import Header from './Header';
const Listing = () => {
    const [users,setUsers]=useState([]);//Hold all the users that we have in firestore database.
  const [loading,setLoading]=useState(false);
 
  useEffect(()=>{//when our app loads we display all the users that we have in firestore.
    setLoading(true);
    //onSnapshot helps to bring the firestore.
    const unsub= onSnapshot(collection(db,"users"),(snapShot)=>{
      let list=[];
      //run forEach on each document
      snapShot.docs.forEach((doc)=>{
        //we push id because id is not present in firestore.
        list.push({id: doc.id,...doc.data()})
      })
      setUsers(list);
      setLoading(false);
    },(error)=>{
      console.log(error)
    })
    return ()=>{
      unsub();
    }
  },[])
  if(loading){
    return <Spinner/>
  }
  return (
    
      
     
    // {users.length!==0 && <div className='container mx-auto px-24 overflow-hidden mt-[5vh] pb-[10vh] '>
    //   <h2 className='pb-[2vh] font-bold text-[2.5rem] text-green-500 border-solid border-grey text-center'>Properties Added By User</h2>
    //   <Grid columns={3} divided>
    //     <GridRow>
    //      <GridColumn>
    //             {
    //             users.map((item)=><ItemCard key={item.id} item={item} users={users} setUsers={setUsers}/>)
    //             }
    //         </GridColumn>
    //     </GridRow>    
    //     </Grid>
    
    // }
    // we remove curlie brackets on {users.length !== 0 && .....} because JSX doesn't require additional curly braces for the return statement if it's a single expression.
    <>
    users.length !== 0 && (
        <div className='container mx-auto px-24 overflow-hidden mt-[5vh] pb-[10vh] '>
          <h2 className='pb-[2vh] font-bold text-[2.5rem] text-green-500 border-solid border-grey text-center'>
            Properties Added By User
          </h2>
          <Grid columns={4} divided>
            <GridRow>
              {console.log("Listing",users)}
                {users.map((item) => (
                  <ItemCard key={item.id} item={item} users={users} setUsers={setUsers} />
                ))}
              
            </GridRow>
          </Grid>
        </div>
      )
    </>
    
    
  )
}

export default Listing
