import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/sectiontitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddItem = () => {
    const { register, handleSubmit ,reset } = useForm()
    const axiosPublic = UseAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        console.log(data)
        //  image upload to imagebb and then get an url 
        const imageFie = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFie, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            // now send the data to database 
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url




            }
            const menuRes = await  axiosSecure.post('/menu' , menuItem );
            console.log(menuRes.data)
            if(menuRes.data.insertedId){
                // show success mesage 
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} added to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        console.log(res.data)

    }
    return (
        <div>
            <SectionTitle
                Headings="Add an Item "
                Subheadigs="Whats new ?"
            ></SectionTitle>

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-control w-full my-6 ">
                        <div className="label">
                            <span className="label-text">  Reciepe name*</span>

                        </div>
                        <input  {...register('name', { required: true })}
                            type="text"
                            placeholder="Reciepe Name"
                            className="input input-bordered w-full " />

                    </label>

                    <div className="flex gap-6">
                        {/* Category  */}
                        <label className="form-control w-full my-6 ">
                            <div className="label">
                                <span className="label-text">  Reciepe name*</span>

                            </div>
                            <select defaultValue="default" {...register('category ', { required: true })} className="select select-error w-full ">
                                <option disabled value="default">Choose a category ? </option>
                                <option value="salad">Salad</option>
                                <option value="soup">Soup</option>
                                <option value="pizza">Pizza</option>
                                <option value="desert">Desert</option>

                                <option value="drinks">Drinks</option>

                            </select>
                        </label>

                        {/* Price  */}
                        <label className="form-control w-full my-6 ">
                            <div className="label">
                                <span className="label-text">  Price*</span>

                            </div>
                            <input  {...register('price', { required: true })}
                                type="number "
                                placeholder="Price "
                                className="input input-bordered w-full " />

                        </label>

                    </div>

                    {/* Reciepe Details  */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Reciepe Details*</span>

                        </div>
                        <textarea {...register('recipe', { required: true })} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>

                    </label>

                    <input  {...register('image', { required: true })} type="file" className="form-control file-input-bordered file-input-accent  w-full my-6 " />


                    <button className="btn btn-accent">
                        Add Item <FaUtensils></FaUtensils>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItem; 