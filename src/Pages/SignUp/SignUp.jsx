import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";
import UseAxiosPublic from './../../Hooks/UseAxiosPublic';
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const axiosPublic = UseAxiosPublic();
    const { createuser, updateuserprofile } = useContext(AuthContext);
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = data => {
        createuser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log("User created:", user);

                updateuserprofile(data.name, data.photoURL)
                    .then(() => {
                        console.log("User profile updated");

                        const userInfo = {
                            name: data.name,
                            email: data.email
                        };

                        axiosPublic.post('users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire("Sign Up Successful", "Your account has been created successfully!", "success");
                                    reset();
                                    navigate(from, { replace: true });
                                } else {
                                    Swal.fire("Sign Up Error", "Failed to save user information.", "error");
                                }
                            })
                            .catch(error => {
                                console.error("Error saving user information:", error);
                                Swal.fire("Sign Up Error", "Failed to save user information.", "error");
                            });
                    })
                    .catch(error => {
                        console.error("Error updating user profile:", error);
                        Swal.fire("Sign Up Error", "Failed to update user profile.", "error");
                    });
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Swal.fire("Sign Up Error", "This email is already in use. Please use a different email.", "error");
                } else {
                    console.error("Error creating user:", error);
                    Swal.fire("Sign Up Error", "Failed to create user.", "error");
                }
            });
    };

    return (
        <>
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: true })}
                                    placeholder="Enter Your Name"
                                    className="input input-bordered"
                                />
                                {errors.name && <span className="text-red-700">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo Url</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("photoURL", { required: true })}
                                    placeholder="Enter Your Photo"
                                    className="input input-bordered"
                                />
                                {errors.photoURL && <span className="text-red-700">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    {...register("email", { required: true })}
                                    placeholder="Enter Your Email"
                                    className="input input-bordered"
                                />
                                {errors.email && <span className="text-red-700">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("password", { required: true })}
                                    placeholder="Enter Your Password"
                                    className="input input-bordered"
                                />
                                {errors.password && <span className="text-red-800">This field is required</span>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className="text-center px-6">
                            <small>
                                Already Have an Account? <Link className="text-blue-800 font-bold" to="/login">Login</Link>
                            </small>
                            <div className="flex justify-evenly p-7">
                            <SocialLogin></SocialLogin>
                        </div>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
