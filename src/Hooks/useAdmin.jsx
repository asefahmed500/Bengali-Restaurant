import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const { user , loading } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { data : isAdmin , isPending : isAdminloading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled : !loading ,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            return res.data?.admin;

        }
    });

    return [isAdmin , isAdminloading]

};



export default useAdmin;