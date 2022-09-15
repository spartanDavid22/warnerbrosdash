import React,{useEffect, useRef, useState, useContext} from 'react';
import style from './Stream.module.css';
import fileContext from '../../context/fileContext';

//Bootstrap Styles
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const getVideoAPI = "https://jwc62fg5a8.execute-api.us-east-1.amazonaws.com/default/getVideo";

function Stream(props){

    const context = useContext(fileContext);
    const [video, setVideo] = useState();

    useEffect(()=>{

        fetch(`${getVideoAPI}?payload=${props.filename}`,{
            method: 'GET'
        }).then((res)=>{return res.json()})
        .then(data=>{
            setVideo(data.signedURL);
        })
        .catch(error =>{
            console.log(error);
        });

    },[]);
    
    const file = context.files.find(item => {
       return item.filename.toLowerCase() === props.filename;
    })

    const sportsType = useRef("");
    const gender = useRef("");
    const date = useRef("");

    function handleSubmit(event){
        event.preventDefault();

        alert(`${sportsType.current.value}
${gender.current.value}
${date.current.value}`)

        sportsType.current.value = '';
        gender.current.value='';
        date.current.value='';
    }

    return(
        <Container className={`mt-5 ${style.container}`}>    
            
            <video key={video} controls className={style.stream}>
                <source src={video} type="video/mp4"/>
            </video>

            <Row>
                <Col className={style.middleLine}>                    
                    <h3 className={`text-center ${style.newText}`}>New Metadata</h3>
                    <Form className={style.metadataForm} onSubmit={handleSubmit}>
                        <Form.Group controlId='sportType' as={Row}>
                            <Form.Label column='lg'><span>Category:</span></Form.Label>
                            <Col xxl={9}>
                                <Form.Control type='text' placeholder='Enter Sport' className={`${style.text} `}/>
                            </Col>
                        </Form.Group>
                        <Form.Group controlId='sportType' as={Row}>
                            <Form.Label column='lg'><span>Date of Event:</span></Form.Label>
                            <Col xxl={9}>
                                <Form.Control as='input' type='date' className={`${style.date} `}/>
                            </Col>
                        </Form.Group>
                        <Form.Group controlId='sportType' as={Row}>
                            <Form.Label column><span>Gender:</span></Form.Label>
                            <Col xxl={9}>
                                <Form.Select aria-label='Select Gender' className={`${style.genderPick} `}>
                                    <option>Select Gender</option>
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
                                    <option value='Other'>Other</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group controlId='sportType' as={Row}>
                            <Form.Label column='lg'><span>Country:</span></Form.Label>
                            <Col xxl={9}>
                                <Form.Control type='text' placeholder='Enter Country' className={`${style.text} mt-1`}/>
                            </Col>
                        </Form.Group>
                        <Button className={`mt-4 ${style.updateBtn}`} >Update Metadata</Button>
                    </Form>
                </Col>
                
                <Col className={style.streamDescr}>
                    <h3 className='text-center'>Current Metadata</h3>
                    <div className={style.descrText}><span>Sport Category:</span> {file.filename.charAt(0).toUpperCase() + file.filename.slice(1)}</div>
                    <div className={style.descrText}><span>Date of Event:</span> {file.date_of_event}</div>
                    <div className={style.descrText}><span>Gender:</span> {file.gender}</div>
                    <div className={style.descrText}><span>Country:</span> {file.gender}</div>
                </Col>
            </Row>

        </Container>
    )
}

export default Stream;
