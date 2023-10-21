import { BarChart } from '@mui/x-charts/BarChart';
import { useSensorAverage } from '../../queries/read';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];

const xLabels = [
  'M',
  'T',
  'w',
  'Th',
  'F',
  'S',
  'Su',
];

const today = new Date();

today.setDate(today.getDate() - 1);
let day1 = today.toISOString();
console.log(day1);

today.setDate(today.getDate() - 1);
let day2 = today.toISOString();
console.log(day2);

today.setDate(today.getDate() - 1);
let day3 = today.toISOString();
console.log(day3);

today.setDate(today.getDate() - 1);
let day4 = today.toISOString();
console.log(day4);

today.setDate(today.getDate() - 1);
let day5 = today.toISOString();
console.log(day5);

today.setDate(today.getDate() - 1);
let day6 = today.toISOString();
console.log(day6);

today.setDate(today.getDate() - 1);
let day7 = today.toISOString();
console.log(day7);

today.setDate(today.getDate() - 1);
let day8 = today.toISOString();
console.log(day8);



export const Graph7 = () => {

    const data = [
        useSensorAverage(day8, day7)?.data,
        useSensorAverage(day7, day6)?.data,
        useSensorAverage(day6, day5)?.data,
        useSensorAverage(day5, day4)?.data,
        useSensorAverage(day4, day3)?.data,
        useSensorAverage(day2, day1)?.data,
        useSensorAverage(day1)?.data,
    ]

    let isUndefined = false;
    let humidity = [];
    let soilmoisture = [];
    let waterlevel = [];
    let temperature = [];

    for(let i = 0; i < data.length; i++) {
        if(typeof(data[i]) == "undefined") isUndefined = true;
    }

    if(!isUndefined) {
        
        humidity     = data?.map(item => {
            if(item.humidity == null) return 0;
            return item.humidity;
        });

        
        temperature  = data?.map(item => {
            if(item.temperature == null) return 0;
            return item.temperature;
        });

        
        waterlevel   = data?.map(item => {
            if(item.waterlevel == null) return 0;
            return item.waterlevel;
        });

        
        soilmoisture = data?.map(item => {
            if(item.soilmoisture == null) return 0;
            return item.soilmoisture;
        });

    }

    return (
        <>
            <div className="absolute top-1 left-1 p-2">
                <b className="text-2xl">This Week's Readings</b>
            </div>

            {!isUndefined &&

                <BarChart
                    // width={500}
                    height={400}
                    series={[
                        { data: soilmoisture, label: 'Soil',      id: 'pvId', color: 'tan' },
                        { data: temperature,  label: 'Temp',      id: 'uvId', color: '#ff6a52' },
                        { data: waterlevel,   label: 'Water',     id: 'qvId', color: '#435598' },
                        { data: humidity,     label: 'Humidity',  id: 'rvId', color: 'cyan'},
                    ]}
                    xAxis={[{ data: xLabels, scaleType: 'band' }]}
                />
            }
        </>
    );
}