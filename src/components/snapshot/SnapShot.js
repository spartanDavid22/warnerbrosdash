import React, { Fragment, useState} from 'react';
import style from './SnapShot.module.css';
import {Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';

function SnapShot(props){

    return(
        <Fragment>
            <Card className={style.card}>
                <Card.Img variant='top' src={props.vid.image}/>
                <Card.Body>
                    <Card.Title>{props.vid.filename.charAt(0).toUpperCase() + props.vid.filename.slice(1)}</Card.Title>
                    <Card.Text>{props.vid.date_of_event}</Card.Text>
                    
                    <Button className={style.watchBtn}>
                        <Link className={style.watchBtn} to={`/dashboard/${props.vid.filename}`}>Watch Video</Link>
                    </Button>

                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default SnapShot;