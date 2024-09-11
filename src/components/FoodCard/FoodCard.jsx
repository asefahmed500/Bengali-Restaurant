import Swal from "sweetalert2";
import UseAuth from "../../Hooks/UseAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import UseCart from "../../Hooks/UseCart";

const FoodCard = ({ item }) => {
    const { name, image, price, recipe } = item;
    const { user } = UseAuth(); // Fetch user from UseAuth
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = UseCart(); // Use the correct hook and instance

    console.log("User object:", user); // Log the entire user object

    const handleAddtoCart = (food) => {
        if (user && user.email) {
            // Log the email and cartItem object to ensure everything is correct
            console.log("User Email:", user.email);

            const cartItem = {
                menuId: food._id,
                email: user.email,
                name: food.name,
                image: food.image,
                price: food.price,
            };

            console.log("Cart Item:", cartItem);

            axiosSecure.post('/carts', cartItem)
                .then((res) => {
                    console.log("Response:", res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${food.name} has been added to your cart`,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        refetch();
                    }
                })
                .catch((error) => {
                    console.error("Error adding to cart:", error);
                });
        } else {
            // Alert user to log in
            Swal.fire({
                title: "You are not logged in!",
                text: "Please login to add items to your cart!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    };


    return (
        <div className="card bg-base-100 shadow-xl">
            <figure>
                <img
                    src={image}
                    alt={name}
                />
            </figure>
            <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-800 text-white">{price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                    <button onClick={() => handleAddtoCart(item)}
                        className="btn btn-outline border-0 border-b-4 mt-4 bg-slate-200">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
