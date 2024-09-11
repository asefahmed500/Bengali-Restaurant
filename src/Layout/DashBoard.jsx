import { FaAd, FaCalendar, FaHome, FaList, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import UseCart from "../Hooks/UseCart";
import { FaBook, FaEnvelope, FaUtensils } from "react-icons/fa6";
import useAdmin from "../Hooks/useAdmin";

const DashBoard = () => {
    const [cart] = UseCart();
    const [isAdmin] = useAdmin();
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400 ">
                <ul className="menu p-4">
                    {
                        isAdmin ? <> <li>

                            <NavLink to="/dashboard/adminhome">
                                <FaHome></FaHome>
                                AdminHome
                            </NavLink>
                        </li>
                            <li>

                                <NavLink to="/dashboard/items">
                                    <FaUtensils></FaUtensils>
                                    Add Items
                                </NavLink>
                            </li>
                            <li>

                                <NavLink to="/dashboard/manageitems">
                                    <FaList></FaList>
                                    Manage Items
                                </NavLink>
                            </li>
                            <li>

                                <NavLink to="/dashboard/managebookings">
                                    <FaBook></FaBook>
                                    Manage Bookoings
                                </NavLink>
                            </li>
                            <li>

                                <NavLink to="/dashboard/allusers">
                                    <FaUser></FaUser>
                                   All Users
                                </NavLink>
                            </li></>
                            :
                            <> <li>

                                <NavLink to="/dashboard/userhome">
                                    <FaHome></FaHome>
                                    UserHome
                                </NavLink>
                            </li>
                                <li>

                                    <NavLink to="/dashboard/reservation">
                                        <FaCalendar></FaCalendar>
                                        Reservation
                                    </NavLink>
                                </li>
                                <li>

                                    <NavLink to="/dashboard/cart">
                                        <FaShoppingCart></FaShoppingCart>
                                        My Cart ( {cart.length})
                                    </NavLink>
                                </li>
                                <li>

                                    <NavLink to="/dashboard/review">
                                        <FaAd></FaAd>
                                        Add a Review
                                    </NavLink>
                                </li>
                                <li>

                                    <NavLink to="/dashboard/paymenthistory">
                                        <FaList></FaList>
                                        Payment Real History 
                                    </NavLink>
                                </li></>
                    }
                    {/* Shared features */}
                    <div className="divider"></div>
                    <li>

                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home
                        </NavLink>
                    </li>
                    <li>

                        <NavLink to="/order/salad">
                            <FaSearch></FaSearch>
                            Menu
                        </NavLink>
                    </li>
                    <li>

                        <NavLink to="/order/contact">
                            <FaEnvelope></FaEnvelope>
                            Contact
                        </NavLink>
                    </li>
                </ul>


            </div>

            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;