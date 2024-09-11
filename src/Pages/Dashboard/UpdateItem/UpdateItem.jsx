import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/sectiontitle/SectionTitle";
import { useForm } from "react-hook-form";

import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const { name, category, recipe, price , _id } = useLoaderData();

    const { register, handleSubmit } = useForm();
    const axiosPublic = UseAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data);
        // Image upload to imagebb and then get a URL 
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (res.data.success) {
            // Now send the data to the database 
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            };

            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
            console.log(menuRes.data);

            if (menuRes.data.modifiedCount > 0) {
                // Show success message 
                // reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is updated to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log(res.data);
    };

    return (
        <div>
            <SectionTitle
                Headings="Update Item"
                Subheadigs="Refresh Info"
            />
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Recipe Name*</span>
                        </div>
                        <input
                            defaultValue={name}
                            {...register('name', { required: true })}
                            type="text"
                            placeholder="Recipe Name"
                            className="input input-bordered w-full"
                        />
                    </label>

                    <div className="flex gap-6">
                        {/* Category */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Category*</span>
                            </div>
                            <select
                                defaultValue={category}
                                {...register('category', { required: true })}
                                className="select select-error w-full"
                            >
                                <option disabled value="default">Choose a category</option>
                                <option value="salad">Salad</option>
                                <option value="soup">Soup</option>
                                <option value="pizza">Pizza</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </label>

                        {/* Price */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input
                                {...register('price', { required: true })}
                                defaultValue={price}
                                type="number"
                                placeholder="Price"
                                className="input input-bordered w-full"
                            />
                        </label>
                    </div>

                    {/* Recipe Details */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details*</span>
                        </div>
                        <textarea
                            {...register('recipe', { required: true })}
                            className="textarea textarea-bordered h-24"
                            defaultValue={recipe}
                            placeholder="Recipe Details"
                        />
                    </label>

                    <input
                        {...register('image', { required: true })}
                        type="file"
                        className="form-control file-input-bordered file-input-accent w-full my-6"
                    />

                    <button className="btn btn-accent">
                        Update Menu Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;
