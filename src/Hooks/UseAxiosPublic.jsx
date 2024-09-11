import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://resturant-server-two.vercel.app'
})
const UseAxiosPublic = () => {
    return axiosPublic ;
};

export default UseAxiosPublic;