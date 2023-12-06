import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;
const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: 0.5px solid ${({theme}) => theme.textSoft};
  margin-left: 5px;
`;
const Text = styled.span``;

export const SingleComment = ({comment}) => {

  const [channel, setChannel] = useState({});

    useEffect(()=> {
      const fetchComment = async () => {
        const res = await axios.get(`/users/find/${comment.userId}`); 
        setChannel(res.data);
      }
      fetchComment();
    },[comment.userId]);
    
  return (
    <Container>
      <Avatar src={channel.img} />
      <Details>
        <Name>{channel.name} <Date>2 minutes ago</Date></Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  )
}
