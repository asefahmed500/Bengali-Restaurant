import { FaTrashAlt } from "react-icons/fa";
import UseCart from "../../../Hooks/UseCart";
import Swal from "sweetalert2";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link } from "react-router-dom";

const Cart = () => {
    const [cart, refetch] = UseCart();
    const axiosSecure = useAxiosSecure();

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        console.log("Response after deletion:", res.data); // Check response
                        if (res.data.deletedCount > 0) {
                            refetch();  // Update the cart after deletion
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your item has been deleted.",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "Not Found!",
                                text: "Item was not found.",
                                icon: "warning"
                            });
                        }
                    })
                    .catch(error => {
                        console.error("Error deleting item:", error); // Log error
                        Swal.fire({
                            title: "Error!",
                            text: "There was a problem deleting your item.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    return (
        <div>
            <div className="flex justify-evenly">
                <h2 className="text-4xl"> Items: {cart.length} </h2>
                <h2 className="text-4xl"> Total Price: ${totalPrice.toFixed(2)} </h2>
                {cart.length ? <Link to="/dashboard/payment">
                    <button className="btn btn-primary"> Pay</button>

                </Link> :
                    <button disabled className="btn btn-primary"> Pay</button>


                }
            </div>
            {/* <div className="flex justify-evenly">
                <h2 className="text-4xl"> Items: {cart?.length || 0} </h2>
                <h2 className="text-4xl"> Total Price: ${totalPrice.toFixed(2)} </h2>
                {
                    cart && cart.length > 0 ? (
                        <Link to="/dashboard/payment">
                            <button className="btn btn-primary"> Pay</button>
                        </Link>
                    ) : (
                        <button disabled className="btn btn-primary"> Pay</button>
                    )
                }
            </div> */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={item.image}
                                                    alt={item.name} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.name}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <th>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-ghost btn-xs">
                                        <FaTrashAlt className="text-red-600" />
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;
