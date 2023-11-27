import { AddTaskOutlined, ReplyOutlined, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'
import { Comments } from '../components/Comments'
import Card from '../components/Card'

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
          <Title>Test Video</Title>
          <Details>
            <Info>7,897,499 views . Jun 22, 2023</Info>
            <Buttons>
              <Button><ThumbUpAltOutlined />123</Button>
              <Button><ThumbDownAltOutlined />Dislike</Button>
              <Button><ReplyOutlined />Share</Button>
              <Button><AddTaskOutlined />Save</Button>
            </Buttons>
          </Details>
          <Hr/>
          <Channel>
            <ChannelInfo>
              <ChannelImage src='https://th.bing.com/th?q=Chart+Logo&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.5&pid=InlineBlock&mkt=en-WW&cc=PK&setlang=en&adlt=moderate&t=1&mw=247' />
              <ChannelDetail>
                <ChannelName>V-Tube</ChannelName>
                <ChannelCount>300k subscribers</ChannelCount>
                <Description>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, pariatur obcaecati id dolorum hic aut sequi sapiente debitis nulla, autem, quae voluptatem facilis quidem veniam magni eaque at! Quis, natus!
                </Description>
              </ChannelDetail>
            </ChannelInfo>
            <Subscribe>SUBSCRIBE</Subscribe>
          </Channel>
          <Hr/>
          <Comments/>
      </Content>
      <Recommendation>
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
      </Recommendation>
    </Container>
  )
}

export default Video