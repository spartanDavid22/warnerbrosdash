import React, {useState } from 'react';
import SnapShot from './SnapShot';
import style from './SnapShotGroup.module.css';

//Bootstrap Styles
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import Pagination from 'react-bootstrap/Pagination';

function SnapShotGroup(props){

    let [active, setActive] = useState(1);
    let pages = [];
    let [start,setStart] = useState(0);
    let [end,setEnd] = useState(12);

    for(let i = 0; i <= Math.ceil(pages.length/12); i++)
    {   
        pages.push(<Pagination.Item key={i+1} id={i+1} active={i+1 === active} onClick={handlePageSwitch}>{i+1}</Pagination.Item>,)
    }

    function handlePageSwitch(event){    
        
        let k = event.currentTarget.id;
        setStart((k - 1) * 12);
        setEnd(k * 12);
        setActive(k);
    }

    function createSnap(item){
        return(
            <Col className='mb-3' xs={12} sm={6} md={4} lg={3} xl={2}>
                <SnapShot vid={item} key={item.filename} />
            </Col>
        )
    }

    function prevPage(){
        if(start - 12 < 0)
        {return};
        setStart(start -= 12);
        setEnd(end -= 12);
        setActive(start/12 + 1);
    }

    function nextPage(){

        setStart(start += 12);
        setEnd(end += 12);
        setActive(start/12 + 1);
    }

    return(
        <div className={style.container}>
            <Container fluid className={`mt-4 ${style.content}`}>          
                <Row>
                    {props.files.slice(start,end).map((file) => {return createSnap(file)})}
                </Row>
            </Container>
            <Container fluid className={style.pageContainer}> 
                <Pagination size='lg'className={style.pages}>
                    <Pagination.Prev onClick={prevPage}/>
                    {pages}
                    <Pagination.Next onClick={nextPage}/>
                </Pagination>
            </Container>
        </div>
    )
}

export default SnapShotGroup;