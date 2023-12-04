import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'
import Card from "../components/Card.jsx"
import axios from 'axios';


const Container = styled.div``
const Search = () => {

    const [videos, setVideos] = useState([]);
    const query = useLocation().search

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://127.0.0.1:8000/api/videos/search${query}`);
            console.log(res);
            setVideos(res.data);
        };
        fetchData(); 
    }, [query]);
  return (
    <Container>
        {
            videos.map((video)=>(
                <Card key={video._id} video={video}/>
            ))
        }
    </Container>
  )
}

export default Search