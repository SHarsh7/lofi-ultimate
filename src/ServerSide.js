import React, { useState } from 'react';
import {useEffect} from "react";

const RESULTS=50;

let finalUrl=`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLrG0ChxS2fPHLgql1GirP9GLhWRo_2L7K&maxResults=${RESULTS}&key=${process.env.REACT_APP_API_KEY}`




function ServerSide() {

    const [data,setData]=useState();

    async function fetchData() {
        const response = await fetch(`${finalUrl}`);
        const data= await response.json();
        setData(data);
    }
    useEffect(() => {
        fetchData();
        }, []);

        console.log(data);
        console.log();
    return(
        <div>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/c6t3bW7kx6E" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
    );
}

export default ServerSide;
