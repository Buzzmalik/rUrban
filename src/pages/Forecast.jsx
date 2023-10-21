import { useState, useEffect } from 'react';

import { LineChart } from '@mui/x-charts/LineChart';

import { convertHourlyToDaily } from '../utilities/converter';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function () {

    const [ forecasts, setForecasts ] = useState(null);
    const [ graph, setGraph ] = useState(true);

    useEffect(() => {

        fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relativehumidity_2m,rain,soil_moisture_1_3cm')
            .then( response => response.json() )
            .then( data => {
                data = convertHourlyToDaily(data?.hourly);

                let chart_data = {
                    date: data?.map(item => item?.date),
                    rain: data?.map(item => item?.rain),
                    hum:  data?.map(item => item?.relativehumidity_2m),
                    soil: data?.map(item => item?.soil_moisture_1_3cm),
                    temp: data?.map(item => item?.temperature_2m),
                };

                
                console.log(chart_data);
                setForecasts(chart_data);
            })
    }, []);


    return (
        <>
            <div className="p-5 flex gap-3 items-center">
                <button onClick={() => setGraph(true)} className={`btn border-2 rounded pl-2 pr-0 py-1 ${graph ? 'bg-blue-600 border-blue-600 hover:bg-blue-500 text-white shadow' : 'border-[#333] hover:bg-[#333] hover:text-white'}`}>
                    <span>Graphs</span>
                    <i className="bi bi-graph-up px-2"></i>
                </button>
                <button onClick={() => setGraph(false)} className={`btn border-2 rounded pl-2 pr-0 py-1 ${!graph ? 'bg-blue-600 border-blue-600 hover:bg-blue-500 text-white shadow' : 'border-[#333] hover:bg-[#333] hover:text-white'}`}>
                    <span>Values</span>
                    <i className="bi bi-distribute-vertical px-2"></i>
                </button>
            </div>
            { graph && 
            <div className="p-5">
                <div className="relative bg-white rounded min-h-[500px] mb-6 shadow-md">
                    <div className="absolute text-2xl font-black top-1 left-1 p-2">
                        Weather Forcast
                    </div>
                    {
                        forecasts && 
                        <LineChart
                            xAxis={[{scaleType: 'point', data: forecasts?.date }]}
                            series={[
                                {
                                data: forecasts?.rain,
                                label: 'Rain (mm)',
                                color: '#435598'
                                },

                                {
                                    data: forecasts?.soil,
                                    label: 'Soil (m³/m³)',
                                    color: 'tan'
                                },

                                {
                                    data: forecasts?.temp,
                                    label: 'Temp (°C)',
                                    color: '#ff6a52'
                                },

                                {
                                    data: forecasts?.hum,
                                    label: 'Humi (%)',
                                    color: 'cyan'
                                },
                            ]}
                            height={500}
                        />
                    }
                </div>

                <div className="relative bg-white rounded min-h-[500px] mb-6 shadow-md">
                    <div className="absolute text-2xl font-black top-1 left-1 p-2">
                        Rain
                    </div>
                    {
                        forecasts && 
                        <LineChart
                            xAxis={[{scaleType: 'point', data: forecasts?.date }]}
                            series={[
                                {
                                data: forecasts?.rain,
                                label: 'Rain (mm)',
                                color: '#435598'
                                },
                            ]}
                            height={500}
                        />
                    }
                </div>

                <div className="relative bg-white rounded min-h-[500px] mb-6 shadow-md">
                    <div className="absolute text-2xl font-black top-1 left-1 p-2">
                        Soil Moisture
                    </div>
                    {
                        forecasts && 
                        <LineChart
                            xAxis={[{scaleType: 'point', data: forecasts?.date }]}
                            series={[

                                {
                                    data: forecasts?.soil,
                                    label: 'Soil (m³/m³)',
                                    color: 'tan'
                                },
                            ]}
                            height={500}
                        />
                    }
                </div>

                <div className="relative bg-white rounded min-h-[500px] mb-6 shadow-md">
                    <div className="absolute text-2xl font-black top-1 left-1 p-2">
                        Soil Temperature
                    </div>
                    {
                        forecasts && 
                        <LineChart
                            xAxis={[{scaleType: 'point', data: forecasts?.date }]}
                            series={[

                                {
                                    data: forecasts?.temp,
                                    label: 'Temp (°C)',
                                    color: '#ff6a52'
                                },
                            ]}
                            height={500}
                        />
                    }
                </div>

                <div className="relative bg-white rounded min-h-[500px] mb-6 shadow-md">
                    <div className="absolute text-2xl font-black top-1 left-1 p-2">
                        Relative Humidity
                    </div>
                    {
                        forecasts && 
                        <LineChart
                            xAxis={[{scaleType: 'point', data: forecasts?.date }]}
                            series={[
                                {
                                    data: forecasts?.hum,
                                    label: 'Humi (%)',
                                    color: 'cyan'
                                },
                            ]}
                            height={500}
                        />
                    }
                </div>
            </div>
            }

            { (forecasts && !graph) &&
            <div className="p-5">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Temperature</TableCell>
                            <TableCell align="right">Humidity</TableCell>
                            <TableCell align="right">Soil Moisture</TableCell>
                            <TableCell align="right">Rain</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {forecasts?.date?.map((item, index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {forecasts?.date[index]}
                            </TableCell>
                            <TableCell align="right">{forecasts?.temp[index]}</TableCell>
                            <TableCell align="right">{forecasts?.hum[index]}</TableCell>
                            <TableCell align="right">{forecasts?.soil[index]}</TableCell>
                            <TableCell align="right">{forecasts?.rain[index]}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            }
        </>


    );
}