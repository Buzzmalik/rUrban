import { useState, useEffect } from 'react'
import { Switch }   from "@mui/material";
import Loading      from '../components/Loading';


export default function() {

    const [ load, setLoad ] = useState(true);

    const [ data, setData ] = useState({});

    const [ change, triggerChange ] = useState(false);

    useEffect(() => {

        fetch("https://malikmustapha.com/rurban/backend/outputs.php")
            .then(result => result.json())
            .then(data => {
                console.log(data)
                setData(data);
                setLoad(false);
            });

    }, []);


    return (
        <>
            <Loading load={load} />

            <h1 className='font-bold text-4xl text-center my-12'>rUrban Control Settings</h1>
            <div className=" flex items-center justify-center flex-wrap gap-3 mb-12">
                {data?.outputs?.map((item, index) => 
                    <Board key={index} board={item} triggerChange={() => triggerChange(!change)} setLoad={setLoad}/>
                )}
            </div>
            <meta name="change" value={change} />

            <h1 className='font-bold text-4xl text-center my-12'>Boards</h1>
            <div className=" flex items-center justify-center flex-wrap gap-3 mb-12">
                {data?.boards?.map((item, index) => 
                    <div key={item} className="h-[200px] w-[200px] rounded shadow bg-white text-gray-400 flex flex-col items-center justify-center">
                        <i className={`bi bi-cpu text-8xl mb-3`}></i>
                        <div className="font-bold">Board {item?.board}</div>
                    </div>
                )}
            </div>
        </>
    );
}

const Board = ({board = {}, triggerChange = () => {}, setLoad=() => {}}) => {

    const [checked, setChecked] = useState(board?.state == 0 ? true : false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        setLoad(true);

        if(event.target.checked) {
            fetch("https://malikmustapha.com/rurban/backend/esp-outputs-action.php?action=output_update&id=" + board?.id + "&state=0").then( () => {
                triggerChange();
                setLoad(false);
            });
        }
        else {
            fetch("https://malikmustapha.com/rurban/backend/esp-outputs-action.php?action=output_update&id=" + board?.id + "&state=1").then( () => {
                triggerChange();
                setLoad(false);
            });
        }
    };

    return (
        <div className={` ${checked ? 'bg-blue-50' : 'bg-white' } h-[300px] w-[300px] rounded overflow-hidden shadow-md flex flex-col items-center justify-center text-center `}>
            <div className="icon">
                <i className={`${checked ? 'text-yellow-300' : 'text-gray-400'} bi bi-motherboard${checked ? '-fill' : ''} text-9xl mb-3`}></i>
                <div className="mt-3">{` ${board?.name} - Board ${board?.board} - GPIO ${board?.gpio} `}</div>
                <div className="text-xs">{''}</div>
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
            </div>
        </div>
    );
}