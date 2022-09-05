import React,{useContext} from 'react';
import style from './Header.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import authContext from '../../context/authContext';
//Bootstrap Styles
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';
import {Auth} from 'aws-amplify';

function Header(props){

    const history = useHistory();

    const {isLoggedIn,onLogout} = useContext(authContext);

    const logoutBtn = <button onClick={()=>{
        onLogout()
        Auth.signOut();
        history.replace('/');
        }}><FontAwesomeIcon icon={faRightFromBracket} size="3x"/></button>; 

    return(
        <Container fluid className={style.header}>
            <Row>
                <Col xs={3} sm={2} md={2} xl={1}>
                    <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/27a20a98-3804-4435-a404-ed93284b7e10/df3fo0i-1d14a7de-14e5-4246-bc67-2ae888bb7ec3.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3YTIwYTk4LTM4MDQtNDQzNS1hNDA0LWVkOTMyODRiN2UxMFwvZGYzZm8waS0xZDE0YTdkZS0xNGU1LTQyNDYtYmM2Ny0yYWU4ODhiYjdlYzMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.YCR8bMDI1yXtMW17hoHK6dJKbM7_Ws4ywdBbk4K9M2o'/>
                </Col>

                <Col >
                    <h1>Warner Bros Discovery Live Sports</h1>
                </Col>

                <Col xs={2} md={1}>
                    {isLoggedIn ? logoutBtn :<></> }
                </Col>
            </Row>
        </Container>
    )
}

export default Header;