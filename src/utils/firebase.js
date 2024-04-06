// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, updateProfile} from "firebase/auth";
import {getFirestore} from "firebase/firestore";// This line imports the getFirestore function from the Firebase Firestore library. This function is used to initialize and get access to a Firestore database.
import {getStorage} from "firebase/storage"//This line imports the getStorage function from the Firebase Storage library. T
import { getDatabase } from 'firebase/database';
// import firebase from 'firebase/app';
// import 'firebase/auth';
import 'firebase/firestore'
// import { getFirestore } from 'firebase/firestore';
import { doc  ,getDoc, setDoc} from 'firebase/firestore';

import { addUser } from "./userSlice";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIfwxpxW-vN20kkEqZNS6AWGcd8dB82CY",
  authDomain: "realestate-adea6.firebaseapp.com",
  projectId: "realestate-adea6",
  storageBucket: "realestate-adea6.appspot.com",
  messagingSenderId: "574121359655",
  appId: "1:574121359655:web:56a0b139aa99045b875102",
  measurementId: "G-VD3YFCFBNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const realdb = getDatabase(app);
const analytics = getAnalytics(app);
export const auth=getAuth();

export const db=getFirestore(app);//Here, db is an instance of the Firestore database obtained by calling getFirestore and passing in the Firebase app instance (app). This instance can be used to interact with the Firestore database, including reading and writing data.
export const storage=getStorage(app);//storage is an instance of Firebase Cloud Storage obtained by calling getStorage and passing in the Firebase app instance (app). This instance allows you to perform operations related to storing and retrieving files in Firebase Cloud Storage.


// In React, the useDispatch hook is designed to be used within a functional component or a custom hook and createUserDocument' that is neither a React function component nor a custom React Hook function.you need to pass the dispatch function as an argument to the createUserDocument function.
export const createUserDocument= async (userAuth,additionalData,dispatch)=>{
  // if no user coming from firebase then just return.
  

  if(!userAuth)return;
  //we get the reference of particular path(`users/${user.uid}`) user and path is users collection with unique Id.
  const userRef=doc(db,`users/${userAuth.uid}`)
  
  // Now we fetch the document at this location. Through userRef.get() we get the document
  // const snapShot = await userRef.get();
  const snapshot = await getDoc(userRef);
  // if document is not present then we create that one.
  console.log("enter out")
  const {useraddress}=additionalData;
  if(!snapshot.exists()){//we are not enerting i this if conditon.check it
    console.log("enter")
    // const {address}=additionalData;
    try{
      //create document at useRef path.
      //  userRef.set({
      //   address
      //  }
      //  )
      await setDoc(userRef, { useraddress });
      // dispatch(
      //   addUser({
      //    address:useraddress
      //   })
      // );
      // dispatch(
      //   addUser({
      //     address: useraddress
      //   })
      // );
      
      console.log("Document set successfully!");
    }catch(err){
      console.log("error in creating user")
    }
  }else{
    //update
    // the updateProfile method is specifically designed for updating the profile of the currently signed-in user, and it primarily deals with properties like displayName and photoURL. It doesn't directly support custom fields like address.If you want to update custom fields in your Firestore document, you should use the setDoc method
    await setDoc(userRef, { useraddress }); 
    // const { uid, email, displayName, photoURL,phoneNumber } = userAuth;
        
    //     dispatch(
    //       addUser({
    //         uid: uid,
    //         email: email,
    //         displayName: displayName,
    //         photoURL: photoURL,
    //         phoneNumber:phoneNumber,
    //         address:useraddress
    //       })
    //     );
    // console.log("Usres",user);

    // console.log(user.useraddress);
    const updatedSnapshot = await getDoc(userRef);

    if (updatedSnapshot.exists()) {
      const updatedData = updatedSnapshot.data();
      console.log("ok",updatedData.useraddress)
      // dispatch(
      //   addUser({
      //     address: updatedData.useraddress
      //   })
      // );

      console.log("Document updated successfully!");
    } else {
      console.log("Document does not exist after update!");
    }
  }
}
export default firebaseConfig;