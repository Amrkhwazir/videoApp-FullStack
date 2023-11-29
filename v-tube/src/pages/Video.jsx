import { AddTaskOutlined, ReplyOutlined, ThumbDown, ThumbDownAlt, ThumbDownAltOutlined, ThumbUp, ThumbUpAlt, ThumbUpAltOutlined } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Comments } from '../components/Comments'
import Card from '../components/Card'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { disLike, fetchSuccess, like } from '../redux/videoSlice'
import {format} from "timeago.js"

const Container = styled.div`
  display: flex;
  gap: 24px;
  font-size: 12px;
`
const Content = styled.div`
  flex: 5;
`

const VideoWrapper = styled.div`

`
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  margin-top: 8px;
  margin-bottom: 5px;
  color: ${({theme}) => theme.text};
`
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Info = styled.span`
    color: ${({theme}) => theme.textSoft};
`
const Buttons = styled.div`
 display: flex;
 gap: 15px;

 color: ${({theme}) => theme.text};
`
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({theme}) => theme.textSoft};
`

const Recommendation = styled.div`
  flex: 2;
`
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`
const ChannelInfo = styled.div`
  display: flex;
  gap: 15px;

`
const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`
const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color:  ${({theme}) => theme.text} ;
`
const ChannelName= styled.span`
  font-weight: 500;
`
const ChannelCount = styled.span`
  margin-top: 5px;
  margin-bottom: 8px;
  color:  ${({theme}) => theme.textSoft};
`
const Description = styled.p`
margin-top: 0px;
margin-right: 5px;
`
const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 5px 10px;
  cursor: pointer;
`


const Video = () => {
  const {currentUser} = useSelector(state => state.user);
  const {currentVideo} = useSelector(state => state.video);
  const dispatch = useDispatch();
  
  const path = useLocation().pathname.split("/")[2]

  const [channel, setChannel] = useState({});
  
  useEffect(()=>{
    const fetchData = async () =>{
      try {
        const videoResponse = await axios.get(`http://127.0.0.1:8000/api/videos/find/${path}`); 
        const channelResponse = await axios.get(`http://127.0.0.1:8000/api/users/find/${videoResponse.data.userId}`); 
        
        setChannel(channelResponse.data);
        dispatch(fetchSuccess(videoResponse.data))

      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  },[path, dispatch])
  
  const likeHandler = async () => {
    await axios.put(`http://127.0.0.1:8000/api/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id))
  }
  
  const disLikeHandler = async () => {
    await axios.put(`http://127.0.0.1:8000/api/users/dislike/${currentVideo._id}`);
    dispatch(disLike(currentUser._id))
  }
  
  return (
    <Container>
      <Content>
        <VideoWrapper>
        <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            ></iframe>
            </VideoWrapper>
          <Title>{currentVideo.title}</Title>
          <Details>
            <Info>{currentVideo.views} views . {format(currentVideo.createdAt)}</Info>
            <Buttons>
              <Button onClick={likeHandler}>
              {currentVideo.likes?.includes(currentUser._id) ? ( 
              <ThumbUpAlt/>
              ) : (
              <ThumbUpAltOutlined />)}{""}
              {currentVideo.likes?.length}
              </Button>
              <Button onClick={disLikeHandler}>
              {currentVideo.dislikes?.includes(currentUser._id) ?
               (<ThumbDownAlt/>) :
               (<ThumbDownAltOutlined />)}{""}
               Dislike
               </Button>
              <Button><ReplyOutlined />Share</Button>
              <Button><AddTaskOutlined />Save</Button>
            </Buttons>
          </Details>
          <Hr/>
          <Channel>
            <ChannelInfo>
              <ChannelImage src={channel.img} />
              <ChannelDetail>
                <ChannelName>{channel.name}</ChannelName>
                <ChannelCount>{channel.Subscribers} subscribers</ChannelCount>
                <Description>
                 {currentVideo.desc}
                </Description>
              </ChannelDetail>
            </ChannelInfo>
            <Subscribe>SUBSCRIBE</Subscribe>
          </Channel>
          <Hr/>
          <Comments/>
      </Content>
      {/* <Recommendation>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
      </Recommendation> */}
    </Container>
  )
}

export default Video