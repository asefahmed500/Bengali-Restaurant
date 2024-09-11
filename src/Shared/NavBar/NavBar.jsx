import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import UseCart from "../../Hooks/UseCart";
import useAdmin from "../../Hooks/useAdmin";

const NavBar = () => {
    const { user, logout } = useContext(AuthContext)
    const [cart] = UseCart();
    const [isAdmin] = useAdmin();

    const handlelogout = () => {
        logout()
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const navoptions = <>
        <li><Link to="/"> Home </Link></li>
        <li><Link to="/menu"> Our Menu </Link></li>
        <li><Link to="order/:category"> Order </Link></li>

        <li><Link to="/signup"> SignUp </Link></li>


        <li>
            <Link to="/dashboard/cart"> {/* Simplified structure */}
                <FaShoppingCart />
                <div className="badge badge-secondary">{cart?.length || 0}</div>
            </Link>
        </li>
        {
            user && isAdmin && <li><Link to="/dashboard/adminhome"> Admin Home </Link></li>
        }
        {
            user && !isAdmin && <li><Link to="/dashboard/userhome"> User Home </Link></li>
        }



        {
            user ? <>
                <span className="rounded-8xl mt-2 p-[1/6]">{user?.displayName}</span>
                <button onClick={handlelogout} className="ml-2"><AiOutlineLogout /> </button>
            </> : <>
                <li><Link to="/login"> Login </Link></li>

            </>
        }



    </>
    return (
        <div className="navbar max-w-5xl mx-auto  fixed z-10 bg-opacity-30 bg-black text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {navoptions}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Benglai Restaurant </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navoptions}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">GET STATED</a>
            </div>
        </div>
    );
};

export default NavBar;