import React from 'react';
import style from './Footer.module.css';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';

function Footer(){
    return(
        <Container fluid className={`${style.container} bottom-0`}>
            <Row>
                <Col className={style.footer}>Warner Bros Discovery Sports ©</Col>
            </Row>
        </Container>
    )
}

export default Footer;