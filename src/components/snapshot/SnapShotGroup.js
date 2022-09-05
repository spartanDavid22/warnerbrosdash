import React, { useEffect, useState } from 'react';
import SnapShot from './SnapShot';

//Bootstrap Styles
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';

function SnapShotGroup(props){

    function createSnap(item){
        return(
            <Col className='mb-3' xs={12} sm={6} md={4} lg={3} xl={2}>
                <SnapShot vid={item} key={item.filename} />
            </Col>
        )
    }

    return(
        <Container fluid className={'mt-4 '}>          
            <Row>
                {props.files.map((snap) => {return createSnap(snap)})}
            </Row>
        </Container>
    )
}

export default SnapShotGroup;