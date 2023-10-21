

import { endpoint } from "./read"


export const editSchedule = async (data) => {

    const result = await fetch(endpoint, {
        method: 'POST',
        Headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: data
    })


    return result.json();

}