import React,{useEffect, useRef, useState} from 'react';
import style from './Stream.module.css';

//Bootstrap Styles
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Stream(props){
    const updateMetaAPI = 'https://n9icxsp9sf.execute-api.us-east-1.amazonaws.com/default/post';
    const getVideoAPI = `https://a8sret1gs8.execute-api.us-east-1.amazonaws.com/getVideo/getSingleSignedURL?`;

    const [video, setVideo] = useState("temporary");
    const [stream, setStream] = useState(0);

    useEffect(()=>{

        fetch(`${getVideoAPI}id=${props.filename}`,{
            method: 'GET',
            headers:{
                accept: "application/json"
            }
        }).then((res)=>{return res.json()})
        .then(data=>{
            setVideo(data);
            setStream(data.URL)
        })
        .catch(error =>{
            console.log(error);
        });

    },[getVideoAPI, props.filename]);
    
    const sportsType = useRef("");
    const gender = useRef("");
    const date = useRef("");
    const country = useRef("");

    function handleSubmit(event){
        event.preventDefault();
    }

    function updateMeta(){

        let body = {
            id: props.filename,
            Country: country.current.value,
            Category: sportsType.current.value,
            Gender: gender.current.value,
            DateOfEvent: date.current.value
        }

        fetch(updateMetaAPI, {
            method: 'POST',
            body: JSON.stringify(body) 
        }).then(res=>{
            console.log(res);
        })

        sportsType.current.value = '';
        gender.current.value='';
        date.current.value='';
        country.current.value = '';
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
                                <Form.Control type='text' placeholder='Enter Sport' ref={sportsType} className={`${style.text} `}/>
                            </Col>
                        </Form.Group>
                        <Form.Group controlId='sportType' as={Row}>
                            <Form.Label column='lg'><span>Date of Event:</span></Form.Label>
                            <Col xxl={9}>
                                <Form.Control as='input' type='date' ref={date} className={`${style.date} `}/>
                            </Col>
                        </Form.Group>
                        <Form.Group controlId='sportType' as={Row}>
                            <Form.Label column><span>Gender:</span></Form.Label>
                            <Col xxl={9}>
                                <Form.Select aria-label='Select Gender' ref={gender} className={`${style.genderPick} `}>
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
                                <Form.Control type='text' placeholder='Enter Country' ref={country} className={`${style.text} mt-1`}/>
                            </Col>
                        </Form.Group>
                        <Button className={`mt-4 ${style.updateBtn}`} onClick={updateMeta}>Update Metadata</Button>
                    </Form>
                </Col>
                
                <Col className={style.streamDescr}>
                    <h3 className='text-center'>Current Metadata</h3>
                    <div className={style.descrText}><span>Sport Category:</span> {video.Category}</div>
                    <div className={style.descrText}><span>Date of Event:</span> {video.DateOfEvent}</div>
                    <div className={style.descrText}><span>Gender:</span> {video.Gender}</div>
                    <div className={style.descrText}><span>Country:</span> {video.Country}</div>
                </Col>
            </Row>

        </Container>
        </div> 
   )
}

export default Stream;
