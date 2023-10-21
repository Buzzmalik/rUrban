import { useState } from 'react';
import { FormControl, InputLabel, OutlinedInput, TextField, Select, MenuItem, InputAdornment, IconButton } from "@mui/material";
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

import { create } from "../queries/create";
import Loading            from '../components/Loading';

export default function() {

    const navigate = useNavigate();

    const [ formdata, setFormdata ] = useState({});
    const [ load, setLoad ] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoad(true);

        if(!checkInputs()) {
            setLoad(false);
            return false;
        }

        const data = new FormData();
        let start = new Date(formdata?.start);
        let end   = new Date(formdata?.end);

        data.append('name',  formdata?.name);
        data.append('start', start.toISOString());
        data.append('end',   end.toISOString());
        data.append('flag',  "new_schedule");

        create(data).then( result => {
            console.log(result);

            Swal.fire(result).then(() => {
                if(result?.icon == 'success') {
                    navigate('/schedules');
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
            keys.length < 3 ||
            formdata?.name.replaceAll(" ", "").length   <= 0
        ) {
            Swal.fire({
                icon: 'error',
                title: 'Empty Inputs',
                text: 'Please provide all inputs and try again.'
            })

            return false;
        }

        let start = new Date(formdata?.start);
        let end   = new Date(formdata?.end);

        if(start > end) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Dates',
                text: 'Please check the dates, the start date should not be ahead of the end date'
            });

            return false;
        }

        return true;
    }

    return (
        <div className="p-5">
            <Loading load={load} />
            <div className="font-black text-2xl mx-auto max-w-[500px] mb-3">New Schedule</div>


            <div className="mx-auto max-w-[500px] mb-3">
                <button to={'/schedules'} onClick={() => navigate(-1)} className="btn  mb-3 block text-center text-sm bg-[#222] text-white px-3 py-1 rounded shadow-md hover:bg-blue-600 active:bg-black">Back</button>
            </div>


            <form onSubmit={handleSubmit} className="mx-auto max-w-[500px] rounded p-3 bg-white shadow">
                <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Schedule Name"
                    placeholder="E.g Easter Schedule"
                    sx={{marginBottom: "1.5rem"}}
                    value={formdata?.name}
                    onChange={(e) => setFormdata({...formdata, name: e.target.value})}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs} size="small" fullWidth >
                    <MobileDateTimePicker
                        onChange={(e) => setFormdata({...formdata, start: e})}
                        label="Start Time" 
                        sx={{width: '100%', marginBottom: "1.5rem"}} 
                        required
                        fullWidth 
                        placeholder={dayjs('2022-04-17T15:30')} 
                    />

                    <MobileDateTimePicker
                        onChange={(e) => setFormdata({...formdata, end: e})}
                        label="End Time" 
                        sx={{width: '100%', marginBottom: "1.5rem"}} 
                        required
                        fullWidth 
                        placeholder={dayjs('2022-04-17T15:30')} 
                    />
                </LocalizationProvider>

                <button className="btn w-full mb-3 block text-center bg-[#222] text-white px-5 py-3 rounded shadow-md hover:bg-blue-600 active:bg-black">Create Schedules</button>
            </form>
        </div>
    );
}