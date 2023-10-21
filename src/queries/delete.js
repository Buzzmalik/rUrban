import { endpoint } from "./read"
import Swal from "sweetalert2";

const deleteWrap = async () => {

    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    })
    
    return result.isConfirmed
}

export const deleteSchedule = async (id, setLoad) => {

    const deleteIt = await deleteWrap();

    if(!deleteIt) return false;

    setLoad(true);

    const data = new FormData();
    data.append('id', id);
    data.append('flag', "delete_schedule");

    const result = await fetch(endpoint, {
        method: 'post',
        body: data,
    });

    const message =  await result.json();

    console.log(message);

    setLoad(false);

    Swal.fire(message);

    return message;
}

export const deleteUser = async (id, setLoad) => {

    const deleteIt = await deleteWrap();

    if(!deleteIt) return false;

    setLoad(true);

    const data = new FormData();
    data.append('id', id);
    data.append('flag', "delete_user");

    const result = await fetch(endpoint, {
        method: 'post',
        body: data,
    });

    const message =  await result.json();

    console.log(message);

    setLoad(false);

    Swal.fire(message);

    return message;
}