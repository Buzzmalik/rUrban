import { useState } from 'react';
import { Link } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Pagination from '@mui/material/Pagination';

import { useSchedules } from '../queries/read';
import { timeDiff, readableDate } from "../utilities/time";

export default function () {


    const [ page, setPage ] = useState(1);

    const { data, isLoading, isError } = useSchedules(page);

    const handlePage = (event, value) => {
        setPage(value);
    }

    return (
        <>
            <div className="p-5">

                <div className="flex items-center justify-between mb-3">
                    <h1 className="font-black text-2xl ">Schedules</h1>
                    <Link to={'/schedule/new'} className="btn bg-[#222] text-white px-5 py-2 rounded shadow-md hover:bg-blue-600 active:bg-black">New Schedule</Link>
                </div>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Start-Time</TableCell>
                            <TableCell align="right">Duration</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {data?.map((row, index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{readableDate(row.start)}</TableCell>
                            <TableCell align="right">{timeDiff(row.start, row.end)}</TableCell>
                            <TableCell align="right">{row.status}</TableCell>
                            <TableCell align="right">
                                <Link to={`/schedule/edit/${row.id}`} className="btn border-1 bg-gray-100 text-[#333] hover:text-white text-xs px-3 py-1 rounded shadow-md hover:bg-blue-600 active:bg-black">Edit</Link>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div className="mx-auto my-3 flex justify-end">
                    <Pagination onChange={handlePage} count={typeof(data) !== 'undefined' ? Math.ceil((data[0]?.data_size ?? 50) / 50) : 1} variant="outlined" shape="rounded" />
                </div>
            </div>
        </>
    );
}