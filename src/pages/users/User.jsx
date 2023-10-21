
import { useState, useRef } from 'react';

import { FormControl, InputLabel, OutlinedInput, TextField, Select, MenuItem, InputAdornment, IconButton } from "@mui/material";

import { editSchedule } from "../../queries/edit";
import { deleteUser } from "../../queries/delete";
import Loading from '../../components/Loading';

import { QueryClient } from 'react-query';

import Swal from "sweetalert2";

export default function( { user }) {

    const [ showPassword, setShowPassword ] = useState(false);

    const [ load, setLoad ] = useState(false);

    const [ image, setImage ] = useState(`https://malikmustapha.com/rurban/backend/uploads/images/${user?.image}`);

    const [ formdata, setFormdata ] = useState({...user, password: ''});

    const inputRef = useRef();

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

        data.append('id',     formdata?.id);
        data.append('name',     formdata?.name);
        data.append('password', formdata?.password);
        data.append('image', formdata?.image);
        data.append('flag',  "edit_user");

        editSchedule(data).then( result => {
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

    const handleDelete = () => {
        
        deleteUser(user.id, setLoad).then((result) => {
            if(typeof(result) == 'boolean') {
                return false;
            }

            queryClient.invalidateQueries();
            location.href = '/users';
        })
    }


    return (
        <form onSubmit={handleSubmit} className="bg-white col-span-1 shadow-md p-2 rounded mb-3 flex gap-3 max-[450px]:flex-col">
            <Loading load={load} />

            <div className="min-h-[150px] w-[190px] max-[450px]:w-full max-[450px]:h-[250px] relative bg-gray-100 rounded overflow-hidden">
                <input onChange={handleImage} ref={inputRef} accept='image/*' type="file" name="image" className="h-0 w-0 overflow-hidden"/>

                <img src={image} className={`object-cover h-full w-full ${image ? 'opacity-100' : 'opacity-0'}`}></img>


                <div className="absolute top-0 left-0 h-full w-full text-center flex items-center justify-center bg-black bg-opacity-30 text-white">
                    Click To Add Image
                </div>
            </div>
            <div className="py-2 w-full-important" style={{width: 'calc(100% - 190px)'}}>
                <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Name"
                    value={formdata?.name}
                    onChange={(e) => setFormdata({...formdata, name: e.target.value})}
                    size="small"
                    sx={{marginBottom: "1rem"}}
                />
                <FormControl fullWidth variant="outlined" size="small" sx={{marginBottom: "1rem"}}>
                    <InputLabel htmlFor="outlined-adornment-password" size="small">Password</InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={null}
                        placeholder="Type here to change password"
                        onChange={(e) => setFormdata({...formdata, password: e.target.value})}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="small"
                            >
                            {showPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                            </IconButton>
                        </InputAdornment>
                        }
                        size="small"
                        label="Password"
                    />
                </FormControl>

                <div className="flex justify-end items-center gap-1">
                    <button type='button' onClick={handleDelete} className="btn border border-red-500 text-red-500 hover:text-white px-3 py-1 rounded shadow-md hover:bg-red-500 active:bg-red-800">
                        <i className="bi bi-trash"></i>
                    </button>
                    <button className="border border-blue-500 bg-blue-600 hover:bg-blue-500 active:bg-blue-800 text-white px-3 py-1 rounded">Update User</button>
                </div>
            </div>
        </form>
    );
}