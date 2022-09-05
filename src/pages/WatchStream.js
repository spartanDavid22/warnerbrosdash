import React from 'react';
import { useParams } from 'react-router-dom';
import Stream from '../components/stream/Stream';

function WatchStream(props){

    const params = useParams();

    return(
        <Stream filename={params.videoId}/>
    )
}

export default WatchStream;