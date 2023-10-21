import { useQuery } from "react-query";


let startDate = new Date(0);
let endDate   = new Date();
endDate.setHours(23, 59, 59, 999);

startDate = startDate.toISOString();
endDate   = endDate.toISOString();


export const endpoint = 'https://malikmustapha.com/rurban/backend/endpoint.php';


export const useSensorData = ( page=1, start= startDate, end=endDate ) => {

    const data = new FormData();

    data.append('page', page);
    data.append('start', start);
    data.append('end', end);
    data.append('flag', "sensor_data");

    return useQuery(['sensor_data', page, start, end], async () => {

        const result = await fetch(endpoint, {

            method: 'POST',

            Headers: {
                'Content-Type': 'multipart/form-data',
            },

            body: data

        });

        return result.json();
    })
}

export const useSensorAverage = ( start=startDate, end=endDate ) => {

    const data = new FormData();

    data.append('start', start);
    data.append('end',   end);
    data.append('flag',  "average_sensor_data");

    return useQuery(['average_sensor_data',  start, end], async () => {

        const result = await fetch(endpoint, {

            method: 'POST',

            Headers: {
                'Content-Type': 'multipart/form-data',
            },

            body: data

        });

        return result.json();
        
    })
}

export const useSchedules = ( page=1, start= startDate, end="9999-12-31" ) => {

    const data = new FormData();

    data.append('page', page);
    data.append('start', start);
    data.append('end', end);
    data.append('flag', "schedules");

    return useQuery(['schedules', page, start, end], async () => {

        const result = await fetch(endpoint, {

            method: 'POST',

            Headers: {
                'Content-Type': 'multipart/form-data',
            },

            body: data

        });

        return result.json();
    })
}

export const useSchedule = ( id ) => {

    const data = new FormData();
    data.append('id', id);
    data.append('flag', "schedule");

    return useQuery(['schedule', id], async () => {

        const result = await fetch(endpoint, {

            method: 'POST',

            Headers: {
                'Content-Type': 'multipart/form-data',
            },

            body: data

        });

        return result.json();
    })
}

export const useUsers = ( page=1, start= startDate, end=endDate ) => {

    const data = new FormData();

    data.append('page', page);
    data.append('start', start);
    data.append('end', end);
    data.append('flag', "users");

    return useQuery(['users', page, start, end], async () => {

        const result = await fetch(endpoint, {

            method: 'POST',

            Headers: {
                'Content-Type': 'multipart/form-data',
            },

            body: data

        });

        return result.json();
    })
}