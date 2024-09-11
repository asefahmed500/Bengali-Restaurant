// import { useQuery } from "@tanstack/react-query";
// import UseAxiosPublic from "./UseAxiosPublic";

// const UseMenu = () => {
//     const axiosPublic = UseAxiosPublic();

//     const { data: menu = [], isPending: loading, refetch } = useQuery({
//         queryKey: ['menu'],
//         queryFn: async () => {
//             const res = await axiosPublic.get('/menu');
//             return res.data;
//         }
//     });

//     return [menu, loading, refetch];
// };

// export default UseMenu;

import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";

const UseMenu = () => {
    const axiosPublic = UseAxiosPublic();

    const { data: menu = [], isLoading, refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            try {
                const res = await axiosPublic.get('/menu');
                return res.data;
            } catch (error) {
                console.error('Error fetching menu:', error);
                throw new Error('Failed to fetch menu');
            }
        }
    });

    return [menu, isLoading, refetch];
};

export default UseMenu;

