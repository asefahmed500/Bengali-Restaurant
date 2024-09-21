import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../components/sectiontitle/SectionTitle";
import UseMenu from "../../Hooks/UseMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const [menu, isLoading, refetch] = UseMenu();
    const axiosSecure = useAxiosSecure();

    const handleDeleteItem = async (item) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            });

            if (result.isConfirmed) {
                console.log(`Deleting item with ID: ${item._id}`);
                const res = await axiosSecure.delete(`/menu/${item._id}`);

                if (!res.data || res.data.deletedCount === undefined) {
                    throw new Error('Unexpected response format');
                }

                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    Swal.fire({
                        icon: "info",
                        title: "Not Found",
                        text: "The item you are trying to delete does not exist.",
                    });
                }
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `There was a problem deleting the item: ${error.message}. Please try again.`,
            });
        }
    };


    return (
        <div>
            <SectionTitle Headings="Manage All Items" Subheadigs="Hurry Up" />
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menu.map((item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.name}</td>
                                <td className="text-right">${item.price.toFixed(2)}</td>
                                <td>
                                    <Link to={`/dashboard/updateitems/${item._id}`}>
                                        <button className="btn btn-ghost btn-xs bg-orange-500">
                                            <FaEdit className="text-white" />
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteItem(item)}
                                        className="btn btn-ghost btn-xs ml-2"
                                    >
                                        <FaTrashAlt className="text-red-600" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageItems;
