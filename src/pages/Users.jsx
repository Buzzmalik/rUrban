import { useState } from 'react';


import { Link } from 'react-router-dom';

import User from "./users/User";
import { useUsers } from '../queries/read';

export default function () {

    const [ page, setPage ] = useState();
    const { data, isLoading, isError } = useUsers(page);

    console.log(data);

    return (
        <div className="p-5">
            <div className="flex items-center justify-between mb-3">
                <h1 className="font-black text-2xl ">Users</h1>
                <Link to="/user/new" className="btn bg-[#222] text-white px-5 py-2 rounded shadow-md hover:bg-blue-600 active:bg-black">New User</Link>
            </div>

            <div className="grid grid-cols-2 max-[1165px]:grid-cols-1 gap-2">
                {data?.map( (item, index) => 
                    <User key={index} user={item} />
                )}
            </div>
        </div>
    );
}