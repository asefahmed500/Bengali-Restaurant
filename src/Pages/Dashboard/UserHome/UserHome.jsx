import UseAuth from "../../../Hooks/UseAuth";


const UserHome = () => {
    const {user} = UseAuth();
    return (
        <div>
            <h2 className="text-3xl">
                <span>Welcome user </span>
                {
                    user?.displayName ? user.displayName : ' unknown'
                }
            </h2>
        </div>
    );
};

export default UserHome;