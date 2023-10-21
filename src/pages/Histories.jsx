import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Pagination from '@mui/material/Pagination';

import { useSensorData } from '../queries/read';
import { timeAgo } from '../utilities/time';


export default function () {

    const [ page, setPage ] = useState(1);

    const { data, isLoading, isError } = useSensorData(page);

    const handlePage = (event, value) => {
        setPage(value);
    }

    return (
        <>
            <div className="p-5">

                <div className="flex items-center justify-between mb-3">
                    <h1 className="font-black text-2xl ">Histories</h1>
                </div>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Date-Time</TableCell>
                            <TableCell align="right">Temperature</TableCell>
                            <TableCell align="right">Humidity</TableCell>
                            <TableCell align="right">Soil Moisture</TableCell>
                            <TableCell align="right">Water Level</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {data?.map((row) => (
                            <TableRow
                            key={row?.Date}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {timeAgo(row?.Date)}
                            </TableCell>
                            <TableCell align="right">{row?.temperature}</TableCell>
                            <TableCell align="right">{row?.humidity}</TableCell>
                            <TableCell align="right">{row?.soilmoisture}</TableCell>
                            <TableCell align="right">{row?.waterlevel}</TableCell>
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