import React, {Fragment, useEffect, useState, useContext} from 'react';
import SnapShotGroup from '../snapshot/SnapShotGroup';
import fileContext from '../../context/fileContext';

function HomeDash(props){
    
    const context = useContext(fileContext);   
    context.files = props.files;
    
    const [files, setFiles] = useState(context.files);

    return(
        <Fragment>
            <SnapShotGroup files={files}/>
        </Fragment>
    )
}

export default HomeDash;