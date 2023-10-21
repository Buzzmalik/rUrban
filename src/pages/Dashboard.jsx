
import { useState } from 'react';

import { Location } from '../components';

import { useSensorData } from '../queries/read';
import { timeAgo } from '../utilities/time';

import { AvergeStat } from  "./dashboard/average";
import { Graph7 } from './dashboard/graph7days';

import Table            from '@mui/material/Table';
import TableBody        from '@mui/material/TableBody';
import TableCell        from '@mui/material/TableCell';
import TableContainer   from '@mui/material/TableContainer';
import TableHead        from '@mui/material/TableHead';
import TableRow         from '@mui/material/TableRow';
import Paper            from '@mui/material/Paper';






export default function () {


    const { data, isLoading, isError } = useSensorData();


    
    return (
        <>
            <div className="p-3 grid grid-cols-12 gap-2 max-[650px]:block">
                <div className="col-span-7 max-[800px]:col-span-8 bg-white p-2 w-full min-h-[400px] shadow-sm rounded overflow-hidden relative">
                    <Graph7 />
                </div>

                <div className="col-span-5 max-[800px]:col-span-4  grid grid-cols-4 max-[800px]:grid-cols-2 max-[650px]:grid-cols-8 max-[500px]:grid-cols-4 max-[400px]:grid-cols-2 gap-2">
                    <AvergeStat />
                </div>
            </div>

            <div className="p-5">
                <Location />
            </div>


            <div className="p-5">
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
            </div>
        </>
    );
}