import { useState, useEffect } from "react";
import { FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton } from "@mui/material";

import { Loading } from "../components";
import { create } from "../queries/create";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function() {
    const [ load, setLoad ] = useState(false);
    const [ showPassword, setShowPassword ] = useState(false);

    const [ formdata, setFormdata ] = useState({});

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    useEffect( () => localStorage.removeItem('hxtp') , [] );

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        setLoad(true);

        if(!checkInputs()) {
            setLoad(false);
            return false;
        }

        const data = new FormData();

        data.append('name',     formdata?.name);
        data.append('password', formdata?.password);
        data.append('flag',  "login");

        create(data).then( result => {

            Swal.fire(result).then(() => {
                if(result?.icon == 'success') {
                    localStorage.setItem("hxtp", "xtxrpxrt");
                    navigate('/rurban');
                }
            });

            setLoad(false);

        }).catch(error => {
            console.error("error: ", error);
            setLoad(false);
        });
    }

    const checkInputs = () => {
        let keys = Object.keys(formdata);

        if(
            keys.length < 2 ||
            formdata?.name.replaceAll(" ", "").length   <= 0
        ) {
            Swal.fire({
                icon: 'error',
                title: 'Empty Inputs',
                text: 'Please provide all inputs and try again.'
            })

            return false;
        }

        return true;
    }

    return (
        <form onSubmit={handleSubmit} className="min-h-[90vh] flex items-center justify-center">
            <Loading load={load} />
            <div className="form-box max-w-[500px] max-[600px]:p-5 flex-grow">
                <h1 className=" text-3xl orb mb-1">Welcome Back</h1>
                <p  className=" mb-6 text-sm text-gray-500 max-w-[320px]">Enter Your email and password to log into your account</p>

                
                <FormControl sx={{marginBottom: "1.5rem", width: "100%"}}>
                    <InputLabel htmlFor="outlined-adornment-amount">Full Name</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start"><i className="bi bi-person-circle"></i></InputAdornment>}
                        label="Full Name"
                        onChange={(e) => setFormdata({...formdata, name: e.target.value})}
                        name="fullname"
                        placeholder="E.g Kwame Ofori"
                        sx={{background: ""}}
                        fullWidth
                        
                    />
                </FormControl>

                <FormControl sx={{marginBottom: "1.5rem", width: "100%"}}>
                    <InputLabel htmlFor="outlined-adornment-amount">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start"><i className="bi bi-shield"></i></InputAdornment>}
                        label="Full Name"
                        name="fullname"
                        placeholder=""
                        sx={{background: ""}}
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => setFormdata({...formdata, password: e.target.value})}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                
                                >
                                {showPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                                </IconButton>
                            </InputAdornment>
                        }
                        fullWidth
                        
                    />
                </FormControl>

                <button className="btn w-full block text-center bg-[#222] text-white px-5 py-3 rounded shadow-md hover:bg-blue-600 active:bg-black">Create User</button>

            </div>
        </form>
    );
}