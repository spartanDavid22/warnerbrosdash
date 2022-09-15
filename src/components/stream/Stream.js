import React,{useEffect, useRef, useState, useContext} from 'react';
import style from './Stream.module.css';

//Bootstrap Styles
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Stream(props){

    const getVideoAPI = `https://vnv7sqoyxc.execute-api.us-east-1.amazonaws.com/Spor/sports/`;

    const [video, setVideo] = useState("temporary");
    const [stream, setStream] = useState(0);

    useEffect(()=>{

        fetch(`${getVideoAPI}${props.filename}`,{
            method: 'GET',
            headers:{
                accept: "application/json"
            }
        }).then((res)=>{return res.json()})
        .then(data=>{
            setVideo(data.Item);
            setStream(data.Item.URL)
        })
        .catch(error =>{
            console.log(error);
        });

    },[]);
    
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
        <div className={style.test}>
        <Container className={`mt-5 ${style.container}`}>    
            
            <video key={stream} controls className={style.stream}>
                <source src={stream} type="video/mp4"/>
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
                    <div className={style.descrText}><span>Sport Category:</span> {video.Category}</div>
                    <div className={style.descrText}><span>Date of Event:</span> {video.DateOfEvent}</div>
                    <div className={style.descrText}><span>Gender:</span> {video.Gender}</div>
                    <div className={style.descrText}><span>Country:</span> {video.Gender}</div>
                </Col>
            </Row>

        </Container>
        </div> 
   )
}

export default Stream;
