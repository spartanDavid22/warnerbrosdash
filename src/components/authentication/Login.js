import React, { useRef, useContext, useState } from 'react'
import style from './Login.module.css';
import authContext from '../../context/authContext';

import {Auth} from 'aws-amplify';

//Bootstrap Styles
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

function Login(props){

    const [showError, setShowError] = useState(false);

    const history = useHistory();

    const username = useRef();
    const password = useRef();

    const {setIsLoggedIn} = useContext(authContext);

    function submitHandler(event){
        event.preventDefault();
        
        Auth.signIn(username.current.value,password.current.value).then(user=>{
            setIsLoggedIn(true);
            history.replace('/dashboard');
            Auth.completeNewPassword(user,"12345678Dav").then(data=>{
                console.log(data)
            })
        }).catch(er=>{
            setShowError(true);
        })


        username.current.value = "";
        password.current.value = "";
    }

    return(
        <Container className={'text-center ' + style['form-container']}>
            <h1>Login</h1>
            {showError ? <h4>User not found</h4> : <></>}
            <Form className={style.formLayout} onSubmit={submitHandler}>
                <Form.Group controlId='username' as={Row}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' placeholder='Enter Username' required ref={username}/>
                </Form.Group>
                
                <Form.Group controlId='Password' as={Row}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' required ref={password}/>
                </Form.Group>
                <Button className='mb-3' size='lg' type='submit'>Login</Button>
            </Form>
        </Container>
    )
}

export default Login;
