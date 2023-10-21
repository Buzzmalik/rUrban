import { useState } from 'react';
import { FormControl, InputLabel, OutlinedInput, TextField, Select, MenuItem, InputAdornment, IconButton, FormLabel, Skeleton } from "@mui/material";
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { QueryClient } from "react-query";
import Swal from "sweetalert2";

import { useSchedule } from '../queries/read';

import { editSchedule } from "../queries/edit";
import { deleteSchedule } from "../queries/delete";
import Loading from '../components/Loading';

export default function() {

    const navigate = useNavigate();

    const { id } = useParams();

    const queryClient = new QueryClient();

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoad(true);

        if(!checkInputs()){
            setLoad(false);
            return false;
        }

        const data = new FormData();
        let start = new Date(formdata?.start);
        let end   = new Date(formdata?.end);

        data.append('id',  id);
        data.append('name',  formdata?.name);
        data.append('status',  formdata?.status);
        data.append('start', start.toISOString());
        data.append('end',   end.toISOString());
        data.append('flag',  "edit_schedule");

        editSchedule(data).then( result => {
            console.log(result);

            Swal.fire(result);

            setLoad(false);

            queryClient.invalidateQueries();
        }).catch(error => {
            setLoad(true);
            console.error("error: ", error); 
        });
    }

    const checkInputs = () => {
        let keys = Object.keys(formdata);

        if(
            keys.length < 4 ||
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

    const handleDelete = () => {
        
        deleteSchedule(id, setLoad).then((result) => {
            if(typeof(result) == 'boolean') {
                return false;
            }

            navigate("/schedules");
        })
    }

    const { data, isLoading, isError } = useSchedule(id);

    const [ formdata, setFormdata ] = useState({name: data?.name, start: data?.start, end: data?.end, status: data?.status});

    const [ load, setLoad ] = useState(false);


    return (
        <div className="p-5">
            <Loading load={load} />
            <div className="font-black text-2xl mx-auto max-w-[500px] mb-3">New Schedule</div>


            <div className="mx-auto max-w-[500px] mb-3">
                <button to={'/schedules'} onClick={() => navigate(-1)} className="btn  mb-3 block text-center text-sm bg-[#222] text-white px-3 py-1 rounded shadow-md hover:bg-blue-600 active:bg-black">Back</button>
            </div>

            {
                data && 

                <form onSubmit={handleSubmit} className="mx-auto max-w-[500px] rounded p-3 bg-white shadow">
                    <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Schedule Name"
                        placeholder="E.g Easter Schedule"
                        sx={{marginBottom: "1.5rem"}}
                        defaultValue={data?.name}
                        onChange={(e) => setFormdata({...formdata, name: e.target.value})}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs} size="small" fullWidth >
                        <MobileDateTimePicker
                            onChange={(e) => setFormdata({...formdata, start: e})}
                            defaultValue={dayjs(formdata?.start)}
                            label="Start Time" 
                            sx={{width: '100%', marginBottom: "1.5rem"}} 
                            required
                            fullWidth 
                            placeholder={dayjs('2022-04-17T15:30')} 
                        />

                        <MobileDateTimePicker
                            onChange={(e) => setFormdata({...formdata, end: e})}
                            defaultValue={dayjs(data?.end)}
                            label="End Time" 
                            sx={{width: '100%', marginBottom: "0.5rem"}} 
                            required
                            fullWidth 
                            placeholder={dayjs('2022-04-17T15:30')} 
                        />
                    </LocalizationProvider>

                    <FormLabel for="state" size="small" sx={{fontSize: "75%"}}>Schedule State</FormLabel>
                    <Select
                        name="state"
                        onChange={(e) => setFormdata({...formdata, status: e.target.value})}
                        defaultValue={data?.status}
                        label="Schedule State"
                        sx={{width: '100%', marginBottom: "1.5rem"}}
                        variant="outlined"
                    >
                        <MenuItem value={"active"}>Active</MenuItem>
                        <MenuItem value={"disabled"}>Disabled</MenuItem>
                    </Select>

                    <button className="btn w-full mb-3 block text-center bg-[#222] text-white px-5 py-3 rounded shadow-md hover:bg-blue-600 active:bg-black">Update Schedules</button>
                    <button type="button" onClick={handleDelete} className="btn w-full mb-3 block text-center font-semibold border-2 border-red-500 bg-white text-red-500 px-5 py-3 rounded shadow-md hover:bg-red-500 hover:text-white active:bg-black">Delete Schedules</button>
                </form>
            }

            {
                (isLoading || isError) &&
                <div className="mx-auto max-w-[500px] mb-3 grid grid-col-1 h-[600px]">
                    <Skeleton sx={{transformOrigin: "0 0"}}/>
                </div>
            }
        </div>
    );
}