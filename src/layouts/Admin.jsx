import { useState, useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const navLinks = [
    {
        name: 'Dashboard',
        icon: 'columns-gap',
        link: '/'
    },
  
    // {
    //     name: 'Zone Control',
    //     icon: 'toggles',
    //     link: '/zone'
    // },
  
    {
        name: 'Schedules',
        icon: 'stopwatch',
        link: '/schedules'
    },
  
    {
        name: 'Weather Forecasts',
        icon: 'cloud-sun',
        link: '/forecasts',
    },
  
    {
        name: 'History',
        icon: 'view-list',
        link: '/history',
    },
  
    {
        name: 'Users',
        icon: 'people',
        link: '/users',
    },
  
    {
        name: 'Settings',
        icon: 'gear',
        link: '/settings',
    },

    {
        name: 'Logout',
        icon: 'box',
        link: '/login',
    },
  
]

export default function Admin() {

    const [ menu, setMenu ] = useState(false);

    const navigate = useNavigate();

    useEffect( () => {

        if(!localStorage.getItem('hxtp')) navigate('/rurban/login');

    }, []);

    console.log(localStorage.getItem('hxtp'));

    return (
        <section className={`hide-container ${menu ? 'active' : ''} h-screen overflow-hidden absolute top-0 right-0`}>
            <div className="menu h-screen overflow-y-scroll overflow-x-hidden bg-[#111] text-white">
                <div className="logo font-black text-2xl text-center my-6 mb-12">
                    <i className="bi bi-r-circle text-4xl"></i>
                    <div>rURBAN</div>
                </div>

                <div className="nav-links px-2 mt-12">
                    {navLinks.map(item =>
                        <Link to={'/rurban' + item?.link} key={item?.name} className="nav-item flex items-center gap-2 p-2 scale-95 hover:bg-[#222] hover:text-white text-[#888] rounded ">
                            <i className={`bi bi-${item?.icon} rounded px-2 py-1 text-md`}></i>
                            <div className="name text-lg ">{item?.name}</div>
                        </Link>
                    )}
                </div>
            </div>
            <div className="screen h-screen overflow-y-scroll overflow-x-hidden bg-slate-50 text-[#333]">
                <nav className='shadow bg-white p-3 rounded w-[98%] mx-auto my-3 flex items-center justify-between'>
                        <i onClick={() => setMenu(!menu)} className='bi bi-list flex items-center justify-center text-2xl '></i>
                </nav>

                <Outlet />

            </div>
        </section>
    );
}