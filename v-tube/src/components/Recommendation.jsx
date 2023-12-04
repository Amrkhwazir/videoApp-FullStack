import Card from "./Card.jsx"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from "styled-components";


const Container = styled.div`
  flex: 2;
`

const Recommendation = ({tags}) => {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://127.0.0.1:8000/api/videos/tags?tags=${tags}`);
            console.log(res);
            setVideos(res.data);
        };
        fetchData(); 
    }, [tags]);
  return (
    <Container>
        {
            videos.map((video)=>(

                <Card type={"sm"} key={videos._id} video={video}/>
            ))
        }
    </Container>
  )
}

export default Recommendation