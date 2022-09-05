import React, { Fragment } from 'react';
import style from './PageNotFound.module.css';

import Container from 'react-bootstrap/esm/Container';

function PageNotFound(props){

    return(
        <Container className='text-center '>
            <h1 className={style.notFound}>The Page You Are Looking For Does Not Exist</h1>
        </Container>
    )
}

export default PageNotFound;