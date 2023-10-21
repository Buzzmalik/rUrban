
import { useSensorAverage } from '../../queries/read';


let daysAgo7 = new Date();
daysAgo7.setDate(daysAgo7.getDate() - 7)
daysAgo7 = daysAgo7.toISOString();


export const AvergeStat = () => {


    const { data, isLoading, isError } = useSensorAverage(daysAgo7);

    console.log(data, daysAgo7);

    const averageValues = [

        {
            title: 'Soil Moisture',
            image: '/images/soil.png',
            value: parseFloat(data?.soilmoisture ?? 0).toFixed(2),
        },
    
        {
            title: 'Temperature',
            image: '/images/temperature.png',
            value: parseFloat(data?.temperature ?? 0).toFixed(2),
        },
    
        {
            title: 'Humidity',
            image: '/images/humidity.png',
            value: parseFloat(data?.humidity ?? 0).toFixed(2),
        },
    
        {
            title: 'Water Level',
            image: '/images/waterlevel.png',
            value: parseFloat(data?.waterlevel ?? 0).toFixed(2)
        },
    
    ];

    return (
        <>
            {averageValues?.map( item => 
                <div key={item?.name} className="col-span-2 h-[200px] max-[800px]:h-[100px] max-[650px]:h-max max-[800px]:flex max-[650px]:flex-col max-[500px]:flex-row items-center gap-4 p-3 bg-white shadow-sm rounded text-center max-[800px]:text-left max-[650px]:text-center max-[500px]:text-left max-[650px]:mt-3">
                    <div className="icon h-[90px] w-[90px] max-[800px]:h-[50px] max-[800px]:w-[50px] rounded-full bg-green-100 mx-auto mb-2 overflow-hidden">
                        <img src={'https://malikmustapha.com/rurban/' + item?.image} className="object-cover h-full w-full" />
                    </div>
                    <div className="flex-grow">
                        <div className="max-[800px]:flex  items-center gap-2 max-[800px]:text-sm whitespace-nowrap">
                            <div className="title font-bold text-xs max-[800px]:hidden max-[400px]:block max-[400px]:text-base  leading-none">Average</div>
                            <div className="title font-bold">{item?.title}</div>
                        </div>
                        <div className="value text-4xl font-black">{item?.value}</div>
                    </div>
                </div>
            )}
        </>
    );
}