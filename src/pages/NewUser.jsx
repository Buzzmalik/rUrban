import { useRef, useState } from 'react';
import { FormControl, InputLabel, OutlinedInput, TextField, Select, MenuItem, InputAdornment, IconButton } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { QueryClient } from "react-query";
import Loading            from '../components/Loading';
import Swal from "sweetalert2";

import { create } from "../queries/create";

export default function() {
    const [ showPassword, setShowPassword ] = useState(false);

    const [ formdata, setFormdata ] = useState({});

    const [ load, setLoad ] = useState(false);

    const [ image, setImage ] = useState(null);

    const inputRef = useRef();

    const navigate = useNavigate();

    const queryClient = new QueryClient();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleImage = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setFormdata({...formdata, image: e.target.files[0]});
    }

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
        data.append('image', formdata?.image);
        data.append('flag',  "new_user");

        create(data).then( result => {
            console.log(result);

            Swal.fire(result).then(() => {
                if(result?.icon == 'success') {
                    queryClient.invalidateQueries();
                    location.href = '/users';
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
        <div className="p-5">
            <Loading load={load} />

            <div className="font-black text-2xl mx-auto max-w-[700px] max-[550px]:w-[300px] mb-3">New User</div>
            <div className=" mx-auto max-w-[700px] max-[550px]:w-[300px] mb-3">
                <button to={'/schedules'} onClick={() => navigate(-1)} className="btn  mb-3 block text-center text-sm bg-[#222] text-white px-3 py-1 rounded shadow-md hover:bg-blue-600 active:bg-black">Back</button>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto max-w-[700px] flex max-[550px]:flex-col max-[550px]:w-max gap-3 items-center justify-center rounded p-3 bg-white shadow">
                <div onClick={() => inputRef.current.click()} className="bg-gray-200 relative h-[200px] w-[200px] max-[550px]:w-full rounded-md shadow overflow-hidden">
                    <input onChange={handleImage} ref={inputRef} accept='image/*' type="file" name="image" className="h-0 w-0 overflow-hidden"/>

                    <img src={image} className={`object-cover h-full w-full ${image ? 'opacity-100' : 'opacity-0'}`}></img>


                    <div className="absolute top-0 left-0 h-full w-full text-center flex items-center justify-center bg-black bg-opacity-30 text-white">
                        Click To Add Image
                    </div>
                </div>
                <div className="max-w-[500px] max-[650px]:max-w-[300px]" >

                    <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Name"
                        onChange={(e) => setFormdata({...formdata, name: e.target.value})}
                        sx={{marginBottom: "1.5rem"}}
                    />

                    <FormControl fullWidth variant="outlined"  sx={{marginBottom: "1.5rem"}}>
                        <InputLabel htmlFor="outlined-adornment-password" >Password</InputLabel>
                        <OutlinedInput
                            fullWidth
                            required
                            id="outlined-adornment-password"
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
                            
                            label="Password"
                        />
                    </FormControl>

                    <button className="btn w-full block text-center bg-[#222] text-white px-5 py-3 rounded shadow-md hover:bg-blue-600 active:bg-black">Create User</button>
                </div>

            </form>
        </div>
    );
}