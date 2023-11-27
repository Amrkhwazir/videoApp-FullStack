import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import axios from 'axios';

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const Container = styled.div`
  width: ${(props)=> props.type !== "sm" && "320px"};
  margin-bottom:${(props)=> props.type === "sm" ? "10px" : "45px"};
  cursor: pointer;
  display:  ${(props)=> props.type === "sm" && "flex"};
  gap: 10px;
`

const Image = styled.img`
  width: 100%;
  height: ${(props)=> props.type === "sm" ? "100px" : "200px"};
  background-color: #999;
  flex: 1;
`

const Details = styled.div`
  display: flex;
  margin-top: ${(props)=> props.type !== "sm" && "14px"};
  gap: 12px;
  flex: 1;
`

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props)=> props.type === "sm" && "none"} ;
`

const Texts = styled.div`
  
`
const Title = styled.h1`
  font-size: 16px;
  font-weight: 600;
  margin-top: 0px;
  margin-bottom: 0px;
  color: ${({theme}) => theme.text};
`
const ChannelName = styled.h2`
  font-size: 12px;
  color: ${({theme}) => theme.textSoft};
  margin: 5px 0px;
`
const Info = styled.div`
font-size: 14px;
color:  ${({theme}) => theme.textSoft};
`

const Card = ({type, video}) => {

  const [channel, setChannel] = useState({});

  useEffect(()=>{
    const fetchChannel = async () =>{
      const response = await axios.get(`http://127.0.0.1:8000/api/users/find/${video.userId}`);
      setChannel(response.data);
      // console.log(response)
    }
    fetchChannel();
  },[video.userId])
  return (
    <Link to="/video/test" style={{textDecoration: "none"}} >
    <Container type={type}>
      <Image type={type} src={video.imgUrl}/>
      <Details type={type}>
        <ChannelImage  type={type} src={channel.img}/>
        <Texts>
          <Title>{video.title}</Title>
          <ChannelName>{channel.name}</ChannelName>
          <Info>{video.views} . </Info>

        </Texts>
      </Details>
      </Container>
    </Link>
  )
}

export default Card