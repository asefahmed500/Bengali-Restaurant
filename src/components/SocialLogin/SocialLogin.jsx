
import { FaGoogle } from "react-icons/fa6";

import UseAuth from "../../Hooks/UseAuth";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const {googleSignin} = UseAuth();
    const axiosPublic = UseAxiosPublic();
    const navigate = useNavigate();


    const hanldegooglesignin = () =>{
        googleSignin()
        .then(result => {
            console.log(result.user)
            const userinfo = {
                email : result.user?.email,
                name : result.user?.displayName
            }
            axiosPublic.post('/users', userinfo)
            .then(res => {
                console.log(res.data);
                navigate('/')
            })


        }
    )

        

    }
    return (
        <div >
            <div className="divider">OR</div>

            <button onClick={hanldegooglesignin}
            className="btn btn-wide "><FaGoogle></FaGoogle> Google</button>
        </div>
    );
};

export default SocialLogin;