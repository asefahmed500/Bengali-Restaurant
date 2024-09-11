import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firebase/firebae.config";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
export const AuthContext = createContext(null)
const auth = getAuth(app);

const AuthProviders = ({children}) => {
    const [user , setuser] = useState(null)
    const [loading , Setloading] = useState(true)
    const googleprovider = new GoogleAuthProvider();
    const axiosPublic = UseAxiosPublic();


    const googleSignin = () =>{
        Setloading(true);
        return signInWithPopup(auth , googleprovider );

    }

    const createuser = (email,password ) => {
        Setloading(true)
        return createUserWithEmailAndPassword(auth , email , password)
    }

    const signin = (email,password) => {
        Setloading(true);
        return signInWithEmailAndPassword(auth, email, password)

    }
    const logout = () => {
       Setloading(true);
       return signOut(auth);

    }

    const updateuserprofile = (name , photo) => {
       return updateProfile(auth.currentUser, {
            displayName:  name, photoURL: photo
          })
    }


    useEffect(() => {
      const unsubscribe =   onAuthStateChanged(auth, CurrentUser => {
            setuser(CurrentUser);
            if(CurrentUser){
                // get token and store client 
                const userInfo = {email: CurrentUser.email};
                axiosPublic.post('/jwt',userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                        Setloading(false)
                    }
                })

            }
            else{
                // remove token (if token stored in the client side : local storage , coching , in memory)
                localStorage.removeItem('access-token');
                Setloading(false)

            }
            console.log('current user ', CurrentUser);
            
        });
        return() => {
           return unsubscribe();
        }
    } , [axiosPublic] )

 
    const authInfo = {
        user,
        loading,
        createuser,
        signin,
        logout,
        updateuserprofile,
        googleSignin

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;