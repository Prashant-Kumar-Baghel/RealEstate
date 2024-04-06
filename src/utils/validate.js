
export const checkValidData=(email, password,isSignInForm,name)=>{
    
    const isEmailValid=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordVaild=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    const isNameValid=/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);
    // console.log(name);
     if(!isSignInForm){
        // console.log(isSignInForm);
        if(!isNameValid) return "Please enter a valid Name."
    }
    if(!isEmailValid) return "Please enter a valid email address."
    if(!isPasswordVaild) return "Please enter a valid Password."
    //Return null When we donot get any error.
    return null;
}
