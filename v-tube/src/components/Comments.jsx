import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { SingleComment } from './SingleComment';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 0.5px solid ${({theme}) => theme.textSoft};
  background: transparent;
  padding: 5px;
  outline: none;
  width: 100%;
`;


export const Comments = ({videoId}) => {

  const {currentUser} = useSelector(state => state.user);

  const [comments, setComments] = useState([]);

  useEffect(()=> {
    const fetchComments = async () => {
      try {
        const response = axios.get(`http://127.0.0.1:8000/api/comments/${videoId}`)
        setComments(response.data);
      } catch (err) {
        console.log(err)
      }
    }
    fetchComments();
  }, [videoId])

  return (
    <Container>
        <NewComment>
            <Avatar src={currentUser.img} />
            <Input placeholder='Add a comment...'/>
        </NewComment>

        {comments?.map((comment)=>(
          <SingleComment key={comment._id} comment={comment} />
        ))}
       
    </Container>
  )
}
