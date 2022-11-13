import React, {Fragment, useState, useContext, useRef} from 'react';
import SnapShotGroup from '../snapshot/SnapShotGroup';
import fileContext from '../../context/fileContext';
import style from './HomeDash.module.css';

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
function HomeDash(props){
    
    const context = useContext(fileContext);   
    context.files = props.files;
    
    const [files, setFiles] = useState(context.files);
    const [tempFiles, setTempFiles] = useState(files);
    const searchParam = useRef();

    function handleSorting(event){
        let temp = []
        
        if(event.target.value == 'nDec'){
            temp = files.sort((l,r)=>{
                if(l.id < r.id){
                    return -1
                }})
        }
        else if(event.target.value == 'nAsc'){
            temp = files.sort((l,r)=>{
                if(l.id > r.id){
                    return -1
                }})
        } 
        else{
            return;
        }

        setFiles((temp)=>[...temp]);
    }

    function handleSearch(event){
        let temp = [];

        if(searchParam.current.value == '')
        {   
            setFiles(tempFiles);
        }
        else{
            temp = files.filter((file)=>{
                let checkString = file.id.toLowerCase().includes(searchParam.current.value.toLowerCase())
                return checkString
            })
            
            setFiles(temp);
        }
    }

    return(
        <Fragment>
            <Container className='mt-3'>
                <Row>
                    <Col xs={5} md={4} lg={3}>
                        <Form.Select aria-label='Sorting options' onChange={handleSorting}>
                            <option>Select sort options</option>
                            <option value="nDec">Sort by name (A to Z)</option>
                            <option value="nAsc">Sort by name (Z to A)</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Control ref={searchParam} placeholder='Search for video'/>
                    </Col>
                    <Col>
                        <Button onClick={handleSearch}>Search</Button>
                    </Col>
                </Row>
            </Container>
            <SnapShotGroup files={files}/>
        </Fragment>
    )
}

export default HomeDash;